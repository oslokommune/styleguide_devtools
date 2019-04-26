# Development

This repo is for contributing to the devtools, as opposed to the patterns. To contribute to the patterns, go to the styleguide repo.

### Setup

Copy the contents of .env.example into a new file named .env.

### Development

To get hot reload on client side code (vue, js, sass) during development run

```shell
docker-compose up
```

ps: changes to php and node.js code will require you to build the image again by running

```shell
docker-compose up --force-recreate --build
```

### Build and deploy a new version of the docker image

```shell
docker build -t ukeweb/styleguide_devtools:[VERSION] .
docker push ukeweb/styleguide_devtools:[VERSION]
```

### Build and deploy for web

```shell
docker build -f .docker/web/Dockerfile -t styleguide_web .
```

Run it locally

```shell
docker run -p 9999:8000 -d styleguide_web
```

Push it

```shell
docker push url/styleguide:SEMVER
```
