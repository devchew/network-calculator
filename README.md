# network-calculator

Simple ui to calculate network ip masks and subnests

## Quickstart

Docker
```
docker run -d -p 8080:8080/tcp networkcalculator:latest 
```

or run from source
```
npm ci
npm run build
npm run serve
```

## develop

install node 18

```
npm ci
npm run start
```

## run prod

```
npm ci
npm run build
```
or use docker

```
docker build -t networkcalculator:latest .
docker run --rm -d -p 8080:8080/tcp networkcalculator:latest 
```

## publish docker image

```
docker build -t devchew/networkcalculator:latest .
docker image push devchew/networkcalculator:latest
```
