.: clean build
.DEFAULT_GOAL := build 

SUDO=$(shell docker info >/dev/null 2>&1 || echo "sudo -E")

build:
	curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh     
	
	go build -o ./build/_output/bin/charthub-server -v
	$(SUDO) docker build -t ${REPO}-server:$COMMIT -f ./build/Dockerfile.server .

clean:
	rm -f ./build/_output/bin/charthub-server
