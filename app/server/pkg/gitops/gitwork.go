/*
Copyright 2019 LitmusChaos Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package gitops

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/controller/handler"
)

const (
	timeInterval  = 1 * time.Hour
	defaultBranch = "master"
)

type GitConfig struct {
	RepositoryName string
	RepositoryURL  string
	RemoteName     string
	LocalCommit    string
	RemoteCommit   string
}

var (
	r      *git.Repository
	w      *git.Worktree
	t      *plumbing.Reference
	status *git.Status

	err error
)

// Trigger is reposible for setting off the go routine for git-op
func Trigger() {
	gitConfig := GitConfig{
		RepositoryName: handler.ChaosChartPath,
		RepositoryURL:  "https://github.com/litmuschaos/chaos-charts",
		LocalCommit:    "", RemoteCommit: "", RemoteName: "origin",
	}
	for {
		versions, _ := gitConfig.getChaosChartVersion()
		for _, version := range versions {
			if err := gitConfig.chaosChartSyncHandler(version); err != nil {
				log.Error(err)
			}
			log.Infof("********* Repository syncing completed for version: '%s' *********", version)
		}
		time.Sleep(timeInterval)
	}
}

func (c GitConfig) getChaosChartVersion() ([]string, error) {
	os.RemoveAll("/tmp/version")
	r, _ := git.PlainClone("/tmp/version", false, &git.CloneOptions{
		URL: c.RepositoryURL, Progress: os.Stdout,
		ReferenceName: plumbing.NewBranchReferenceName(defaultBranch),
	})

	tagrefs, err := r.Tags()
	if err != nil {
		return nil, fmt.Errorf("unable to get tag reference, err: %+v", err)
	}
	var versions []string
	versions = append(versions, defaultBranch)
	err = tagrefs.ForEach(func(t *plumbing.Reference) error {
		versions = append([]string{t.Name().Short()}, versions...)
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("unable to get each tag reference, err: %+v", err)
	}
	json, err := json.Marshal(versions)
	if err != nil {
		return nil, fmt.Errorf("unable to marshal version data, err: %+v", err)
	}
	ioutil.WriteFile("/tmp/version.json", json, os.ModePerm)
	return versions, nil
}

// chaosChartSyncHandler is responsible for all the handler functions
func (c GitConfig) chaosChartSyncHandler(version string) error {
	repositoryExists, err := c.isRepositoryExists(version)
	if err != nil {
		return fmt.Errorf("Error while checking repo exists, err: %s", err)
	}
	log.WithFields(log.Fields{"repositoryExists": repositoryExists}).Info("Executed isRepositoryExists()... ")

	if !repositoryExists {
		return c.HandlerForNonExistingRepository(version)
	}
	return c.HandlerForExistingRepository(version)

}

// isRepositoryExists checks for the existence of this past existence of this repository
func (c GitConfig) isRepositoryExists(version string) (bool, error) {
	_, err := os.Stat(c.RepositoryName + "/" + version)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

// HandlerForNonExistingRepository calls function GitPlainClone, which is called only when the repository exists
func (c GitConfig) HandlerForNonExistingRepository(version string) error {
	var referenceName plumbing.ReferenceName
	if version == defaultBranch {
		referenceName = plumbing.NewBranchReferenceName(version)
	} else {
		referenceName = plumbing.NewTagReferenceName(version)
	}
	_, err := git.PlainClone(c.RepositoryName+"/"+version, false, &git.CloneOptions{
		URL: c.RepositoryURL, Progress: os.Stdout,
		ReferenceName: referenceName,
	})
	if err != nil {
		return fmt.Errorf("unable to clone '%s' reference of chaos-chart, err: %+v", version, err)
	}
	return nil
}

// HandlerForExistingRepository relative functions if the isRepositoryExists fails
func (c GitConfig) HandlerForExistingRepository(version string) error {
	dirtyStatus, err := c.GitGetStatus(version)
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"DirtyStatus": dirtyStatus}).Info("Executed GitGetStatus()... ")

	if dirtyStatus {
		return c.HandlerForDirtyStatus(version)
	}
	return c.HandlerForCleanStatus(version)
}

// GitGetStatus excutes "git get status --porcelain" for the provided Repository Path,
// returns false if the repository is clean
// and true if the repository is dirtygitConfig
func (c GitConfig) GitGetStatus(version string) (bool, error) {
	log.Info("executing GitGetStatus() ...")
	err := c.setterRepositoryWorktreeReference(version)
	if err != nil {
		return true, err
	}
	log.Info("git status --porcelain")
	len, _ := getListofFilesChanged()
	return !(len == 0), nil
}

func (c GitConfig) setterRepositoryWorktreeReference(version string) error {
	if r, err = git.PlainOpen(c.RepositoryName + version); err != nil {
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	if w, err = r.Worktree(); err != nil {
		return fmt.Errorf("error in executing Worktree: %s", err)
	}
	t, err = r.Head()
	if err != nil {
		return fmt.Errorf("error in executing Head: %s", err)
	}
	return nil
}

// HandlerForDirtyStatus calls relative functions if the GitGetStatus gives a clean status as a result
func (c GitConfig) HandlerForDirtyStatus(version string) error {
	if err := c.GitHardReset(version); err != nil {
		return err
	}
	MatchValue, err := c.CompareLocalandRemoteCommit(version)
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"MatchValue": MatchValue}).Info("Executed CompareLocalandRemoteCommit()... ")
	if !MatchValue {
		return c.HandlerForMismatchCommits(version)
	}
	return nil
}

func getListofFilesChanged() (int, error) {
	status, err := w.Status()
	if err != nil {
		return 0, fmt.Errorf("error in executing Status: %s", err)
	}
	var listOfFilesChanged []string
	for file := range status {
		listOfFilesChanged = append(listOfFilesChanged, file)
	}
	return len(listOfFilesChanged), nil
}

// GitHardReset executes "git reset --hard HEAD" in provided Repository Path
func (c GitConfig) GitHardReset(version string) error {
	r, err := git.PlainOpen(c.RepositoryName + version)
	if err != nil {
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	w, err := r.Worktree()
	if err != nil {
		return fmt.Errorf("error in executing Worktree: %s", err)
	}
	if w.Reset(&git.ResetOptions{Mode: git.HardReset}) != nil {
		return fmt.Errorf("error in executing Reset: %s", err)
	}
	return nil
}

// CompareLocalandRemoteCommit compares local and remote latest commit
func (c GitConfig) CompareLocalandRemoteCommit(version string) (bool, error) {
	r, err := git.PlainOpen(c.RepositoryName + version)
	if err != nil {
		return false, fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	h, err := r.ResolveRevision(plumbing.Revision(version))
	if err != nil {
		return false, fmt.Errorf("error in executing ResolveRevision: %s", err)
	}
	c.RemoteCommit = h.String()
	log.Infof("LocalCommit: '%s',RemoteCommit: '%s'", c.LocalCommit, c.RemoteCommit)
	return c.RemoteCommit == c.LocalCommit, nil
}

// GitPull updates the repository in provided Path
func (c GitConfig) GitPull(version string) error {
	log.Info("executing GitPull() ...")
	err := c.setterRepositoryWorktreeReference(version)
	if err != nil {
		return err
	}
	var referenceName plumbing.ReferenceName
	if version == defaultBranch {
		referenceName = plumbing.NewBranchReferenceName(version)
	} else {
		referenceName = plumbing.NewTagReferenceName(version)
	}
	log.Info("git pull origin")
	err = w.Pull(&git.PullOptions{RemoteName: c.RemoteName, ReferenceName: referenceName})
	log.Infof("Executed git pull origin, Status: %s", err)

	c.LocalCommit = strings.Split(t.String(), " ")[0]
	return nil
}

// HandlerForCleanStatus calls relative functions if the GitGetStatus gives a clean status as a result
func (c GitConfig) HandlerForCleanStatus(version string) error {
	MatchValue, err := c.CompareLocalandRemoteCommit(version)
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"MatchValue": MatchValue}).Info("Executed CompareLocalandRemoteCommit()... ")
	if !MatchValue {
		err := c.GitPull(version)
		if err != nil {
			return err
		}
	}
	return nil
}

// HandlerForMismatchCommits calls relative functions if the Local and Remote Commits do not match
func (c GitConfig) HandlerForMismatchCommits(version string) error {
	err := c.GitPull(version)
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"execution": "complete"}).Info("Executed GitPull()... ")
	return nil
}
