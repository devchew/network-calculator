# network-calculator

Simple ui to calculate network ip masks and subnests

## develop

install node 18

```
npm ci
npm run
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
