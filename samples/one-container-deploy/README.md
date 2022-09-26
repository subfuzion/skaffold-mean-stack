# one-container-deploy

Single container deployment of both the backend and frontend apps. The Angular
frontend static assets are served from the backend Express server's `public`
directory.

Clone this repo and cd to `skaffold-mean-stack/samples/one-container-deploy`.

> The single container deployment depends on the following `Dockerfile` to build
the container image:
> `./samples/one-container-deploy/third-party/Dockerfile`

## Run containers locally

You can launch containers manually using `docker` commands, launch them with a
single command using `docker compose`, or launch them with a single command
using `minikube`.

### 🚀 Manually launch containers using `docker` commands

1. Cd to `skaffold-mean-stack/samples/one-container-deploy/thirdparty` and
enter the following:

```text
# build a docker container image
docker build -t app .

# create a network so the app can connect to mongo
docker network create --driver bridge backend_net

# start mongodb in a container
docker run -d --name database -p 27017:27017 --network backend_net mongo:6

# start the app in a container
docker run -d -p 8080:8080 --name app --network backend_net -e ATLAS_URI="mongodb://database" app

# tail the app log (press Ctrl-C when finished)
docker logs -f app
```

2. Navigate to http://localhost:8080 in your browser.

3. Clean up

```text
docker rm -f app
docker rm -f database
docker network rm backend_net
```

### 🚀 Launch containers using Docker Compose

1. Cd to `skaffold-mean-stack/samples/one-container-deploy` and enter the
following:

```text
docker compose up
```

2. Navigate to http://localhost:8080 in your browser.

3. Clean up

Press Ctrl-C or use another terminal and enter:

```text
docker compose kill
```

To remove all stopped containers, enter:

```text
docker rm $(docker ps -aq)
```

### 🚀 Launch containers using Skaffold and Minikube

1. Cd to `skaffold-mean-stack/samples/one-container-deploy` and enter the
   following:

```text
minikube tunnel
```

2. Open another terminal and enter:

```text
skaffold dev
```

3. Navigate to http://localhost:8080 in your browser.

4. Clean up

Press Ctrl-C in the terminals you were using.

## third-party

The `third-party` directory contains the MEAN stack demo source code. It was
cloned from this
[pull request](https://github.com/mongodb-developer/mean-stack-example/pull/2)
of
[mongodb-developer/mean-stack-example](https://github.com/mongodb-developer/mean-stack-example/pull/2).
