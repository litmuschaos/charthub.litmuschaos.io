package main

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"gopkg.in/src-d/go-git.v4"
	. "gopkg.in/src-d/go-git.v4/_examples"
	"gopkg.in/src-d/go-git.v4/plumbing"
)

var repoPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/chaos-charts/"
var tempCommit string
var masterCommit string

func triggerCloning() {

	fmt.Println("triggerClone() -->")

	Info("git clone https://github.com/litmuschaos/chaos-charts")
	r, err := git.PlainClone(repoPath, false, &git.CloneOptions{
		URL:      "https://github.com/litmuschaos/chaos-charts",
		Progress: os.Stdout,
	})

	// Retrieve the branch pointed by HEAD
	CheckIfError(err)
	Info("git rev-parse HEAD")

	t, err := r.Head()
	CheckIfError(err)
	tempCommit = strings.Split(t.String(), " ")[0]

}
func triggerUpdate() {

	fmt.Println("triggerUpdate() -->")

	// We instantiate a new repository targeting the given path (the .git folder)
	r, err := git.PlainOpen(repoPath)
	CheckIfError(err)

	// Get the working directory for the repository
	w, err := r.Worktree()
	CheckIfError(err)

	// Pull the latest changes from the origin remote and merge into the current branch
	Info("git pull origin")
	err = w.Pull(&git.PullOptions{RemoteName: "origin"})
	// CheckIfError(err)

	// Retrieve the branch pointed by HEAD
	Info("git rev-parse HEAD")
	t, err := r.Head()
	CheckIfError(err)
	tempCommit = strings.Split(t.String(), " ")[0]

}
func triggerHardReset() {
	fmt.Println("triggerHardReset() -->")
	// Opens an already existing repository.
	r, err := git.PlainOpen(repoPath)
	CheckIfError(err)

	w, err := r.Worktree()
	CheckIfError(err)

	Info("git reset --hard")

	err = w.Reset(&git.ResetOptions{Mode: git.HardReset})

}
func triggerGetStatus() bool {
	fmt.Println("triggerGetStatus() -->")
	// Opens an already existing repository.
	r, err := git.PlainOpen(repoPath)
	CheckIfError(err)

	w, err := r.Worktree()
	CheckIfError(err)

	// We can verify the current status of the worktree using the method Status.
	Info("git status --porcelain")
	status, err := w.Status()
	CheckIfError(err)

	var listOfFilesChanged []string
	// fmt.Println(status == nil)
	for file := range status {
		listOfFilesChanged = append(listOfFilesChanged, file)
	}
	if len(listOfFilesChanged) == 0 {
		return false //==> clean
	}
	return true //==> dirty

}

//commit local commit and global repo
func compareCommit() bool {

	r, err := git.PlainOpen(repoPath)
	CheckIfError(err)

	Info("git rev-parse master")
	h, err := r.ResolveRevision(plumbing.Revision("master"))
	CheckIfError(err)
	masterCommit = h.String()
	fmt.Println(tempCommit)
	fmt.Println(masterCommit)
	if masterCommit == tempCommit {
		return true
	}
	return false
}
func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}
func CheckIfError(err error) {

	if err != nil {
		log.Fatal("---> ", err)
	}

}

func driver() {

	existenceValue, err := exists(repoPath)
	CheckIfError(err)
	if !existenceValue {
		triggerCloning()
	} else {

		if !triggerGetStatus() {
			// for clean status
			if !compareCommit() {
				triggerUpdate()
			}
		} else {
			// for dirty status
			triggerHardReset()
			if !compareCommit() {
				triggerUpdate()
			}

		}
	}

}

func main() {
	for true {
		go driver()
		time.Sleep(6 * time.Hour)
	}

}
