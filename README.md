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

# Troubleshoot Guide
1. If the changes in the sass file are not reflected in the browser until the frontend server is restarted again using npm start, Run the following commands:
```
npm install node-sass
npm start
```

2. If you get the following error: **System limit for number of file watchers reached** run this command in your terminal:
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
for more details check out this [stackoverflow post](https://stackoverflow.com/questions/53930305/nodemon-error-system-limit-for-number-of-file-watchers-reached)

# Development Guide
For the theme switcher to work the styles in the scss files should be according to the theme properties (defined in theme.scss).

CSS Properties like color should be specified with the contents of the class-styles wrapped with ```@include themify($themes){}``` (any nested css doesn't need this to be specified again) and css rules should be written as ```color: themed("someColor")```

Example:

jsx file:
```
<div className="root">
    Hello World
    <p className="para">Paragraph</p>
</div>
```
scss file:
```
.root{
    @include themify($themes){
        background-color: themed("primaryColor");
        .para{
            color: themed("secondaryColor");
        }
    }
}
```


# License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flitmuschaos%2Fcharthub.litmuschaos.io?ref=badge_large)
