package main

import (
	"os"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"

	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"
)
const TIME_INTERVAL = 6 * time.Hour

type GitConfig struct {
	RepositoryName string
	RepositoryURL  string
	RemoteName     string
	LocalCommit    string
	RemoteCommit   string
}

// Trigger is reposible for setting off the go routine for git-op
func Trigger() {

	object := GitConfig{
		RepositoryName: os.Getenv("GOPATH") + "/src/github.com/litmuschaos/chaos-charts/",
		RepositoryURL:  "https://github.com/litmuschaos/chaos-charts",
		LocalCommit:    "",
		RemoteCommit:   "",
		RemoteName:     "origin",
	}
	for true {
		object.GitOpDriver()
		time.Sleep(TIME_INTERVAL)
	}
}

// CheckERROR is used to handle errors thrown by any git-op called
func CheckERROR(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

// CheckIfRepositoryExists checks for the existence of this past existence of this repository
func (object GitConfig) CheckIfRepositoryExists() (bool, error) {
	_, err := os.Stat(object.RepositoryName)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

// CompareLocalandRemoteCommit compares local and remote latest commit
func (object GitConfig) CompareLocalandRemoteCommit() bool {

	r, err := git.PlainOpen(object.RepositoryName)
	CheckERROR(err)

	log.Info("git rev-parse master")
	h, err := r.ResolveRevision(plumbing.Revision("master"))
	CheckERROR(err)
	object.RemoteCommit = h.String()
	log.Info("LocalCommit  = ", object.LocalCommit)
	log.Info("RemoteCommit = ", object.RemoteCommit)
	if object.RemoteCommit == object.LocalCommit {
		return true
	}
	return false
}

// GitGetStatus excutes "git get status --porcelain" for the provided Repository Path,
// returns false if the repository is clean
// and true if the repository is dirty
func (object GitConfig) GitGetStatus() bool {
	log.Info("executing GitGetStatus() ...")
	// Opens an already existing repository.
	r, err := git.PlainOpen(object.RepositoryName)
	CheckERROR(err)

	w, err := r.Worktree()
	CheckERROR(err)
	// fmt.Println(status == nil)
	// We can verify the current status of the worktree using the method Status.
	log.Info("git status --porcelain")
	status, err := w.Status()
	CheckERROR(err)

	var listOfFilesChanged []string
	for file := range status {
		listOfFilesChanged = append(listOfFilesChanged, file)
	}
	if len(listOfFilesChanged) == 0 {
		return false //==> clean
	}
	return true //==> dirty
}

// GitHardReset executes "git reset --hard HEAD" in provided Repository Path
func (object GitConfig) GitHardReset() {

	log.Info("executing GitHardReset() ...")

	// Opens an already existing repository.
	r, err := git.PlainOpen(object.RepositoryName)
	CheckERROR(err)

	w, err := r.Worktree()
	CheckERROR(err)

	log.Info("git reset --hard")

	err = w.Reset(&git.ResetOptions{Mode: git.HardReset})

}

// GitPlainClone clones the repository through the provided URL in provided Path
func (object GitConfig) GitPlainClone() {

	log.Info("executing GitPlainClone() ...")

	log.Info("git clone ", object.RepositoryURL)
	r, err := git.PlainClone(object.RepositoryName, false, &git.CloneOptions{
		URL:      object.RepositoryURL,
		Progress: os.Stdout,
	})

	// Retrieve the branch pointed by HEAD
	CheckERROR(err)
	log.Info("git rev-parse HEAD")

	t, err := r.Head()
	CheckERROR(err)
	object.LocalCommit = strings.Split(t.String(), " ")[0]
	log.Info("Local Commit = ", object.LocalCommit)
}

// GitPull updates the repository in provided Path
func (object GitConfig) GitPull() {

	log.Info("executing GitPull() ...")

	// We instantiate a new repository targeting the given path (the .git folder)
	r, err := git.PlainOpen(object.RepositoryName)
	CheckERROR(err)

	// Get the working directory for the repository
	w, err := r.Worktree()
	CheckERROR(err)

	// Pull the latest changes from the origin remote and merge into the current branch
	log.Info("git pull origin")
	err = w.Pull(&git.PullOptions{RemoteName: object.RemoteName})
	// CheckERROR(err)

	// Retrieve the branch pointed by HEAD
	log.Info("git rev-parse HEAD")
	t, err := r.Head()
	CheckERROR(err)
	object.LocalCommit = strings.Split(t.String(), " ")[0]
	log.Info("Local Commit = ", object.LocalCommit)

}

// GitOpDriver is responsible for all the handler functions
func (object GitConfig) GitOpDriver() {

	repositoryExists, err := object.CheckIfRepositoryExists()
	CheckERROR(err)
	log.WithFields(log.Fields{
		"repositoryExists": repositoryExists,
	}).Info("Executed CheckIfRepositoryExists()... ")

	if !repositoryExists {

		object.GitPlainClone()
		log.WithFields(log.Fields{
			"execution": "complete",
		}).Info("Executed GitPlainClone()... ")
	} else {
		dirtyStatus := object.GitGetStatus()
		log.WithFields(log.Fields{
			"DirtyStatus": dirtyStatus,
		}).Info("Executed GitGetStatus()... ")

		if !dirtyStatus {
			// for clean status
			MatchValue := object.CompareLocalandRemoteCommit()
			log.WithFields(log.Fields{
				"MatchValue": MatchValue,
			}).Info("Executed CompareLocalandRemoteCommit()... ")

			if !MatchValue {
				object.GitPull()
				log.WithFields(log.Fields{
					"execution": "complete",
				}).Info("Executed GitPull()... ")
			}
		} else {
			// for dirty status
			object.GitHardReset()
			log.WithFields(log.Fields{
				"execution": "complete",
			}).Info("Executed GitHardReset()... ")

			MatchValue := object.CompareLocalandRemoteCommit()
			log.WithFields(log.Fields{
				"MatchValue": MatchValue,
			}).Info("Executed CompareLocalandRemoteCommit()... ")

			if !MatchValue {
				object.GitPull()
				log.WithFields(log.Fields{
					"execution": "complete",
				}).Info("Executed GitPull()... ")
			}

		}
	}
}
