package gitops

import (
	"fmt"
	"os"
	"strings"
	"time"
	"github.com/litmuschaos/charthub.litmuschaos.io/server/controller/handler"
	log "github.com/sirupsen/logrus"

	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"
)

const Time_Interval = 6 * time.Hour

type GitConfig struct {
	RepositoryName string
	RepositoryURL  string
	RemoteName     string
	LocalCommit    string
	RemoteCommit   string
}

// Trigger is reposible for setting off the go routine for git-op
func Trigger() {

	gitConfig := GitConfig{
		RepositoryName: handler.ChaosChartPath,
		RepositoryURL:  "https://github.com/litmuschaos/chaos-charts",
		LocalCommit:    "",
		RemoteCommit:   "",
		RemoteName:     "origin",
	}
	for true {
		err := gitConfig.chaosChartSyncHandler()
		if err != nil {
			log.Error(err)
		}
		time.Sleep(Time_Interval)
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
	log.Info("git rev-parse master")
	h, err := r.ResolveRevision(plumbing.Revision("master"))
	if err != nil {
		return false, fmt.Errorf("error in executing ResolveRevision: %s", err)

	}
	object.RemoteCommit = h.String()
	log.Info("LocalCommit  = ", object.LocalCommit)
	log.Info("RemoteCommit = ", object.RemoteCommit)
	if object.RemoteCommit == object.LocalCommit {
		return true, nil
	}
	return false, nil
}

// GitGetStatus excutes "git get status --porcelain" for the provided Repository Path,
// returns false if the repository is clean
// and true if the repository is dirtygitConfig
func (object GitConfig) GitGetStatus() (bool, error) {
	log.Info("executing GitGetStatus() ...")
	// Opens an already existing repository.
	r, err := git.PlainOpen(object.RepositoryName)
	if err != nil {
		return true, fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	w, err := r.Worktree()
	if err != nil {
		return true, fmt.Errorf("error in executing Worktree: %s", err)
	}

	// We can verify the current status of the worktree using the method Status.
	log.Info("git status --porcelain")
	status, err := w.Status()
	if err != nil {
		return true, fmt.Errorf("error in executing Status: %s", err)
	}
	var listOfFilesChanged []string
	for file := range status {
		listOfFilesChanged = append(listOfFilesChanged, file)
	}
	if len(listOfFilesChanged) == 0 {
		return false, nil //==> clean
	}
	return true, nil //==> dirty
}

// GitHardReset executes "git reset --hard HEAD" in provided Repository Path
func (object GitConfig) GitHardReset() error {

	log.Info("executing GitHardReset() ...")

	// Opens an already existing repository.
	r, err := git.PlainOpen(object.RepositoryName)
	if err != nil {
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}
	w, err := r.Worktree()
	if err != nil {
		return fmt.Errorf("error in executing Worktree: %s", err)
	}
	log.Info("git reset --hard")
	err = w.Reset(&git.ResetOptions{Mode: git.HardReset})
	if err != nil {
		return fmt.Errorf("error in executing Reset: %s", err)
	}
	return nil
}

// GitPlainClone clones the repository through the provided URL in provided Path
func (object GitConfig) GitPlainClone() error {

	log.Info("executing GitPlainClone() ...")

	log.Info("git clone ", object.RepositoryURL)
	r, err := git.PlainClone(object.RepositoryName, false, &git.CloneOptions{
		URL:      object.RepositoryURL,
		Progress: os.Stdout,
	})

	// Retrieve the branch pointed by HEAD
	if err != nil {
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

// GitPull updates the repository in provided Path
func (object GitConfig) GitPull() error {

	log.Info("executing GitPull() ...")

	// We instantiate a new repository targeting the given path (the .git folder)
	r, err := git.PlainOpen(object.RepositoryName)
	if err != nil {
		return fmt.Errorf("error in executing PlainOpen: %s", err)
	}

	// Get the working directory for the repository
	w, err := r.Worktree()
	if err != nil {
		return fmt.Errorf("error in executing Worktree: %s", err)
	}

	// Pull the latest changes from the origin remote and merge into the current branch
	log.Info("git pull origin")
	err = w.Pull(&git.PullOptions{RemoteName: object.RemoteName})
	if err != nil {
		return fmt.Errorf("error in executing Pull: %s", err)
	}

	// Retrieve the branch pointed by HEAD
	log.Info("git rev-parse HEA--D")
	t, err := r.Head()
	if err != nil {
		return fmt.Errorf("error in executing Head: %s", err)
	}
	object.LocalCommit = strings.Split(t.String(), " ")[0]
	log.Info("Local Commit = ", object.LocalCommit)
	return nil
}

// chaosChartSyncHandler is responsible for all the handler functions
func (object GitConfig) chaosChartSyncHandler() error {

	repositoryExists, err := object.isRepositoryExists()
	if err != nil {
		return fmt.Errorf("Error while checking repo exists, err: %s", err)
	}
	log.WithFields(log.Fields{
		"repositoryExists": repositoryExists,
	}).Info("Executed isRepositoryExists()... ")

	if !repositoryExists {

		err := object.GitPlainClone()
		if err != nil {
			return err
		}
		log.WithFields(log.Fields{
			"execution": "complete",
		}).Info("Executed GitPlainClone()... ")
	} else {
		dirtyStatus, err := object.GitGetStatus()
		if err != nil {
			return err
		}
		log.WithFields(log.Fields{
			"DirtyStatus": dirtyStatus,
		}).Info("Executed GitGetStatus()... ")

		if !dirtyStatus {
			// for clean status
			MatchValue, err := object.CompareLocalandRemoteCommit()
			if err != nil {
				return err
			}
			log.WithFields(log.Fields{
				"MatchValue": MatchValue,
			}).Info("Executed CompareLocalandRemoteCommit()... ")

			if !MatchValue {
				err := object.GitPull()
				if err != nil {
					return err
				}
				log.WithFields(log.Fields{
					"execution": "complete",
				}).Info("Executed GitPull()... ")
			}
		} else {
			// for dirty status
			err := object.GitHardReset()
			if err != nil {
				return err
			}
			log.WithFields(log.Fields{
				"execution": "complete",
			}).Info("Executed GitHardReset()... ")

			MatchValue, err := object.CompareLocalandRemoteCommit()
			if err != nil {
				return err
			}
			log.WithFields(log.Fields{
				"MatchValue": MatchValue,
			}).Info("Executed CompareLocalandRemoteCommit()... ")

			if !MatchValue {
				err := object.GitPull()
				if err != nil {
					return err
				}
				log.WithFields(log.Fields{
					"execution": "complete",
				}).Info("Executed GitPull()... ")
			}

		}
	}
	return nil
}
