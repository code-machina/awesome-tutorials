# react-starter-boilerplate-hmr

> React Starter Boilerplate with Hot Module Replacement and Webpack 4

## Features

- React 16
- React Router 4
- Semantic UI as the CSS Framework
- Hot Module Replacement
- CSS Autoprefixer
- CSS Modules with SourceMap
- @babel/plugin-proposal-class-properties
- @babel/plugin-syntax-dynamic-import
- Webpack 4
- Code splitting by Route and Vendor
- [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer)
- Take a look at [package.json](https://github.com/code-machina/react-starter-boilerplate-pack/blob/master/package.json)

### Usage

Install dependencies

```
$ yarn
```

Run development server

```
$ yarn dev
```

### Building

```
$ yarn build
```

Will create a `dist` directory containing your compiled code.

Depending on your needs, you might want to do more optimization to the production build.

## Webpack Bundle Analyzer

Run in development

```
$ yarn dev:bundleanalyzer
```

Run on the production oprimized build

```
$ yarn build:bundleanalyzer
```

## Tutorial

Visit my [blog entry](https://medium.freecodecamp.org/learn-webpack-for-react-a36d4cac5060) where I go step-by-step on how to build this boilerplate from scratch.
