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
	"fmt"
	"os"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/controller/handler"
)

const TimeInterval = 1 * time.Hour

type GitConfig struct {
	RepositoryName string
	RepositoryURL  string
	RemoteName     string
	LocalCommit    string
	RemoteCommit   string
	TargetBranch   string
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
	targetBranch, ok := os.LookupEnv("CHAOS_CHART_BRANCH")
	if !ok {
		log.Error("CHAOS_CHART_BRANCH environment variable required")
		return
	}
	gitConfig := GitConfig{
		RepositoryName: handler.ChaosChartPath, RepositoryURL: "https://github.com/litmuschaos/chaos-charts", LocalCommit: "", RemoteCommit: "", RemoteName: "origin", TargetBranch: targetBranch,
	}
	for true {
		if err := gitConfig.chaosChartSyncHandler(); err != nil {
			log.Error(err)
		}
		time.Sleep(TimeInterval)
	}
}

// isRepositoryExists checks for the existence of this past existence of this repository
func (object GitConfig) isRepositoryExists() (bool, error) {
	_, err := os.Stat(object.RepositoryName)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

// CompareLocalandRemoteCommit compares local and remote latest commit
func (object GitConfig) CompareLocalandRemoteCommit() (bool, error) {
	r, err := git.PlainOpen(object.RepositoryName)
	if err != nil {
		return false, fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	log.Infof("git rev-parse %s", object.TargetBranch)
	h, err := r.ResolveRevision(plumbing.Revision(object.TargetBranch))
	if err != nil {
		return false, fmt.Errorf("error in executing ResolveRevision: %s", err)
	}
	object.RemoteCommit = h.String()
	log.Info("LocalCommit  = ", object.LocalCommit, "RemoteCommit = ", object.RemoteCommit)
	return object.RemoteCommit == object.LocalCommit, nil
}

func getListofFilesChanged() (int, error) {
	status, err := w.Status() // We can verify the current status of the worktree using the method Status.
	if err != nil {
		return 0, fmt.Errorf("error in executing Status: %s", err)
	}
	var listOfFilesChanged []string
	for file := range status {
		listOfFilesChanged = append(listOfFilesChanged, file)
	}
	return len(listOfFilesChanged), nil
}

// GitGetStatus excutes "git get status --porcelain" for the provided Repository Path,
// returns false if the repository is clean
// and true if the repository is dirtygitConfig
func (object GitConfig) GitGetStatus() (bool, error) {
	log.Info("executing GitGetStatus() ...")
	err := object.setterRepositoryWorktreeReference()
	if err != nil {
		return true, err
	}
	log.Info("git status --porcelain")
	len, _ := getListofFilesChanged()
	return !(len == 0), nil //==> true(dirty), false(clean)
}

// GitHardReset executes "git reset --hard HEAD" in provided Repository Path
func (object GitConfig) GitHardReset() error {
	r, err := git.PlainOpen(object.RepositoryName) // Opens an already existing repository.
	if err != nil {
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	w, err := r.Worktree()
	if err != nil {
		return fmt.Errorf("error in executing Worktree: %s", err)
	}
	log.Info("executing GitHardReset()... git reset --hard")
	if w.Reset(&git.ResetOptions{Mode: git.HardReset}) != nil {
		return fmt.Errorf("error in executing Reset: %s", err)
	}
	return nil
}

// GitPlainClone clones the repository through the provided URL in provided Path
func (object GitConfig) GitPlainClone() error {
	log.Infof("executing GitPlainClone() ... git clone '%s' of branch '%s'", object.RepositoryURL, object.TargetBranch)
	r, err := git.PlainClone(object.RepositoryName, false, &git.CloneOptions{URL: object.RepositoryURL, Progress: os.Stdout, ReferenceName: plumbing.NewBranchReferenceName(object.TargetBranch)})
	if err != nil { // Retrieve the branch pointed by HEAD
		return fmt.Errorf("error in executing PlainClone: %s", err)
	}
	log.Info("git rev-parse HEAD")
	t, err := r.Head()
	if err != nil {
		return fmt.Errorf("error in executing Head: %s", err)
	}
	object.LocalCommit = strings.Split(t.String(), " ")[0]
	log.Info("Local Commit = ", object.LocalCommit)
	return nil
}
func (object GitConfig) setterRepositoryWorktreeReference() error {
	if r, err = git.PlainOpen(object.RepositoryName); err != nil { // We instantiate a new repository targeting the given path (the .git folder)
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	if w, err = r.Worktree(); err != nil { // Get the working directory for the repository
		return fmt.Errorf("error in executing Worktree: %s", err)
	}
	t, err = r.Head()
	if err != nil {
		return fmt.Errorf("error in executing Head: %s", err)
	}
	return nil
}

// GitPull updates the repository in provided Path
func (object GitConfig) GitPull() error {
	log.Info("executing GitPull() ...")
	err := object.setterRepositoryWorktreeReference()
	if err != nil {
		return err
	}
	log.Info("git pull origin")
	if w.Pull(&git.PullOptions{RemoteName: object.RemoteName, ReferenceName: plumbing.NewBranchReferenceName(object.TargetBranch)}) != nil { // Pull the latest changes from the origin remote and merge into the current branch
		return fmt.Errorf("error in executing Pull: %s", w.Pull(&git.PullOptions{RemoteName: object.RemoteName}))
	}
	log.Info("git rev-parse HEA--D") // Retrieve the branch pointed by HEAD
	object.LocalCommit = strings.Split(t.String(), " ")[0]
	log.Info("Local Commit = ", object.LocalCommit)
	return nil
}

// HandlerForCleanStatus calls relative functions if the GitGetStatus gives a clean status as a result
func (object GitConfig) HandlerForCleanStatus() error {
	MatchValue, err := object.CompareLocalandRemoteCommit()
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"MatchValue": MatchValue}).Info("Executed CompareLocalandRemoteCommit()... ")
	if !MatchValue {
		err := object.GitPull()
		if err != nil {
			return err
		}
		log.WithFields(log.Fields{"execution": "complete"}).Info("Executed GitPull()... ")
	}
	return nil
}

// HandlerForMismatchCommits calls relative functions if the Local and Remote Commits do not match
func (object GitConfig) HandlerForMismatchCommits() error {
	err := object.GitPull()
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"execution": "complete"}).Info("Executed GitPull()... ")
	return nil
}

// HandlerForDirtyStatus calls relative functions if the GitGetStatus gives a clean status as a result
func (object GitConfig) HandlerForDirtyStatus() error {
	if err := object.GitHardReset(); err != nil {
		return err
	}
	log.WithFields(log.Fields{"execution": "complete"}).Info("Executed GitHardReset()... ")
	MatchValue, err := object.CompareLocalandRemoteCommit()
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"MatchValue": MatchValue}).Info("Executed CompareLocalandRemoteCommit()... ")
	if !MatchValue {
		return object.HandlerForMismatchCommits()
	}
	return nil
}

// HandlerForNonExistingRepository calls function GitPlainClone, which is called only when the repository exists
func (object GitConfig) HandlerForNonExistingRepository() error {
	err := object.GitPlainClone()
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"execution": "complete"}).Info("Executed GitPlainClone()... ")
	return nil
}

// HandlerForExistingRepository relative functions if the isRepositoryExists fails
func (object GitConfig) HandlerForExistingRepository() error {
	dirtyStatus, err := object.GitGetStatus()
	if err != nil {
		return err
	}
	log.WithFields(log.Fields{"DirtyStatus": dirtyStatus}).Info("Executed GitGetStatus()... ")

	if !dirtyStatus {
		// for clean status
		return object.HandlerForCleanStatus()
	}
	// for dirty status
	return object.HandlerForDirtyStatus()
}

// chaosChartSyncHandler is responsible for all the handler functions
func (object GitConfig) chaosChartSyncHandler() error {
	repositoryExists, err := object.isRepositoryExists()
	if err != nil {
		return fmt.Errorf("Error while checking repo exists, err: %s", err)
	}
	log.WithFields(log.Fields{"repositoryExists": repositoryExists}).Info("Executed isRepositoryExists()... ")

	if !repositoryExists {
		return object.HandlerForNonExistingRepository()
	}
	return object.HandlerForExistingRepository()

}
