# charthub.litmuschaos.io 
front-end for litmus community charts.
# installation
install NPM packages
`yarn install`.
# usage
navigate into `server` folder and run `go run *.go`. then navigate back to the root folder and run run: `yarn start` to run development server,
to create production build run `yarn build`. Open your browser and go to `http://localhost:3000/`

# docker
Build and tag the Docker image:
`docker build -t sample:dev .`.
Once the build is done run: `docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm sample:dev`.

Go to your browser and open: `http://172.17.0.2:3000/`

Using the production Dockerfile, build and tag the Docker image: `docker build -f Dockerfile-prod -t sample:prod .`.
Spin up the container: `docker run -it -p 80:80 --rm sample:prod`
