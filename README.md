# Litmus Chaos Community Chart Hub

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io?ref=badge_shield)

# Development Setup

## Prerequisite

- Golang is installed and configured, If not follow the instructions [here](https://golang.org/doc/install).
- Install Node.js and npm. Follow the instructions [here](https://nodejs.org/en/download/current/).
- Repo should be cloned to your go path, repo path should be 
```
$GOPATH/src/github.com/litmuschaos/charthub.litmuschaos.io
```

## Tech Stack from Frontend

- [x] [Material-UI](https://github.com/mui-org/material-ui)
- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-Thunk](https://github.com/gaearon/redux-thunk)
- [x] [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [x] [React Router](https://github.com/ReactTraining/react-router)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] PWA Support

## Tech Stack from Backend
- [x] [Go](https://golang.org/dl/)
- [x] [Gorilla/Mux](https://github.com/gorilla/mux)
- [x] [Logrus](https://github.com/sirupsen/logrus)
- [x] [gopkg.in/yaml.v3](https://gopkg.in/yaml.v3)
- [x] [gopkg.in/src-d/go-git.v4](https://gopkg.in/src-d/go-git.v4)

## Start Frontend

Install it and run:

```bash
cd app/client
npm i
npm start
```

Build it and serve:

```bash
cd app/client
npm run build
npm install -g serve
serve -s build
```

## Enable PWA ServiceWorker [OPTIONAL]

Just comment in the following line in the `index.tsx`:

```javascript
// registerServiceWorker();
```

to

```javascript
registerServiceWorker();
```

## Start Backend Server

```bash
cd app/server
go run main.go
```
The backend go server will be up and running on port 8080

## Dev setup: Enable Prettier [OPTIONAL]
1.  Step: Install the Prettier plugin (e.g. the one of Esben Petersen)
2.  Add the following snippet to your settings in VSCode:

```json
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
       "source.organizeImports": true // optional
   },
```

## Usage
Open your browser and go to `http://localhost:3000/` to access the frontend

# Docker Setup
This project has been configured to run with docker, you can initialize the system by running 
```bash
 docker-compose up
```
This will setup the nginx and go server for you. To access the frontend use `http://localhost/`. You need to have docker and docker-compose installed to use this method.

# Resources

### Our Standup open community meeting link:

Feel free to drop by and participate in our discussion of new open source projects [here](https://us02web.zoom.us/j/89804064103?pwd=cjJnWkVUeE56SUo2ZWxVcjR2QWpCQT09)

### Figma Design document for the Front-end website:

View, review, give feedbacks and add comments, suggests upgrades, just about anything related to design right [here](https://www.figma.com/file/cCkF2KTCd7Yx3Gn4KWp9sC/Listmus-Chathub?node-id=0%3A1)

### Visit our main Litmus repo:

Were are more than welcoming to a new contributor, pay a visit and star it for updates right [here](https://github.com/litmuschaos/litmus)

# License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io?ref=badge_large)
