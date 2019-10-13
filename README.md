# charthub.litmuschaos.io  
front-end for litmus community charts.

# installation
- Install Golang [Instructions here!](https://golang.org/doc/install)
- Install NodeJS,npm [Instructions here!](https://nodejs.org/en/download/current/)
- Install yarn [Instructions here!](https://yarnpkg.com/en/docs/install)
- install NPM packages

    ```bash
    yarn install
    ```
- install Go server dependencies

    ```bash
    go get github.com/gorilla/mux
    ```

    ```bash
    go get gopkg.in/yaml.v3
    ```
# usage
navigate into `server` folder and run `go run *.go`. then navigate back to the root folder and run run: `yarn start` to run development server,
to create production build run `yarn build`. Open your browser and go to `http://localhost:3000/`

# docker

Install docker compose [Instructions here!](https://docs.docker.com/compose/install/)

Run the containers using docker-compose

```docker-compose up```

Go to your browser and open: `http://localhost`

You can also run server and client seperately using the commands

```docker-compose up server```

and

```docker-compose up client```