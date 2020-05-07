# Front-end for litmus community charts.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io?ref=badge_shield)

# Development Setup:

## Prerequisite
 - Golang is installed and configured, If not follow the instructions [here](https://golang.org/doc/install).
- Install Node.js and npm. Follow the instructions [here](https://nodejs.org/en/download/current/).

## Starting development server

Clone the charthub Repo
```
git clone https://github.com/litmuschaos/charthub.litmuschaos.io.git
cd charthub.litmuschaos.io
```
Start the backend api server

```
go run server/main.go
```

Install and start the frontend server.
```
npm install
npm start
```

# Usage
Open your browser and go to `http://localhost:3000/` to access the frontend

# License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io?ref=badge_large)
