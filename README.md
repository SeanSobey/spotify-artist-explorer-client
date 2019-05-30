# spotify-artist-explorer-client

NodeJS server for the spotify artist explorer app, see the [server app](https://github.com/SeanSobey/spotify-artist-explorer-server/).

## Project setup

### Install node modules

```
npm install
```

### Set constants for local dev

1) Open `src/constants.ts`
2) If not already done, register a [Test App](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) on a dev account.
3) Set redirect url (`spotify.redirectURI`), should use the domain of this locally running website, eg `'http://localhost:8080/auth.html'`.
4) Set client ID (`spotify.clientId`), from the spotify app dashboard.
5) Set the oauth server (`authServer`), the domain of the locally running server app (`spotify-artist-explorer-server`), eg `'http://localhost:3000'`.

## Compiles and hot-reloads for development

```
npm run serve
```

## Compiles and minifies for production

```
npm run build
```

## Run tests

```
npm run test
```

## Lints and fixes files

```
npm run lint
```

## Run end-to-end tests

```
npm run test:e2e
```

## Run unit tests

```
npm run test:unit
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
