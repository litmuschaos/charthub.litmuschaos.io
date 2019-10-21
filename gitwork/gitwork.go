package main

import (
	"fmt"
	"os"
	"time"

	"gopkg.in/src-d/go-git.v4"
	. "gopkg.in/src-d/go-git.v4/_examples"
)

var repoPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/chaos-charts/"

func triggerCloning() {

	fmt.Println("triggerClone() -->")

	Info("git clone https://github.com/litmuschaos/chaos-charts")
	_, err := git.PlainClone(repoPath, false, &git.CloneOptions{
		URL:      "https://github.com/litmuschaos/chaos-charts",
		Progress: os.Stdout,
	})
	CheckIfError(err)

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

}

func CheckIfError(err error) {

	if err != nil {
		// log.Fatal("---> ", err)
		// if err == "repository already exists" {
		// 	fmt.Println("Hello")
		// }

	}

}

func driver() {

	existenceValue, err := exists(repoPath)
	CheckIfError(err)
	fmt.Println("trigger working")
	if !existenceValue {
		triggerCloning()

	} else {
		triggerUpdate()

	}

}

func main() {
	for true {
		if time.Now().Second()%2 == 0 {
			time.Sleep(100 * time.Millisecond)
			go driver()

		}
	}
}
