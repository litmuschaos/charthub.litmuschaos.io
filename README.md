# charthub.litmuschaos.io  
Front-end for litmus community charts.

# Installation
- Install Golang. Follow the instructions [here](https://golang.org/doc/install).
- Install Node.js and npm. Follow the instructions [here](https://nodejs.org/en/download/current/).
- Install Yarn. Follow the instructions [here](https://yarnpkg.com/en/docs/install).
- Install npm packages.
  ```
  yarn install  
  ```
- Install Go server dependencies.
  ```
  go get github.com/gorilla/mux
  go get gopkg.in/yaml.v3
  ```

# Usage
Navigate into `server` folder and run `go run *.go`. This will start the backend framework. 
Now, navigate back to the root folder in a separate terminal and run `yarn start` to run development server; 
to create production build, run `yarn build`. This conjoined process starts up the charthub on your localhost. 
Open your browser and go to `http://localhost:3000/`.

# docker
Build and tag the Docker image:
`docker build -t sample:dev .`.
Once the build is done run: `docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm sample:dev`.

Go to your browser and open: `http://172.17.0.2:3000/`

Using the production Dockerfile, build and tag the Docker image: `docker build -f Dockerfile-prod -t sample:prod .`.
Spin up the container: `docker run -it -p 80:80 --rm sample:prod`
