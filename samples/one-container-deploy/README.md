# one-container-deploy

Single container deployment of both the backend and frontend apps. The Angular
frontend static assets are served from the backend Express server's `public`
directory.

Clone this repo and cd to `skaffold-mean-stack/samples/one-container-deploy`.

# Run containers locally

You can launch containers manually using `docker` commands, launch them with a
single command using `docker compose`, or launch them with a single command
using `minikube`.

## Manually launch containers using `docker` commands

1. Cd to `skaffold-mean-stack/samples/one-container-deploy/thirdparty` and run:

```text
docker build -t app .
```

2. Create a network

```text
docker network create --driver bridge backend_net
```

3. Start the database

```text
docker run -d --name database -p 27017:27017 --network backend_net mongo:6
```

4. Start the app

```text
docker run -d -p 8080:8080 --name app --network backend_net -e ATLAS_URI="mongodb://database" app
```

5. View app log

```text
docker logs -f app
```

Press Ctrl-C when finished.

6. Test app

Navigate to http://localhost:8080 in your browser.

7. Clean up

```text
docker rm -f app
docker rm -f database
docker network rm backend_net
```

## Launch containers using Docker Compose

1. Cd to `skaffold-mean-stack/samples/one-container-deploy` and run:

```text
docker compose up
```

2. Test app

Navigate to http://localhost:8080 in your browser.

3. Clean up

Press Ctrl-C or use another terminal and enter:

```text
docker compose kill
```

To remove all stopped containers, enter:

```text
docker rm $(docker ps -aq)
```

## third-party

The `third-party` directory was cloned from this
[pull request](https://github.com/mongodb-developer/mean-stack-example/pull/2)
of
[mongodb-developer/mean-stack-example](https://github.com/mongodb-developer/mean-stack-example/pull/2).
