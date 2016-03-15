# TweetPedia

[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

**Welcome to tweetpedia!**

![](assets/images/logo.gif)

TweetPedia is a simple webapp built in ReactJS and NodeJS that allows you to search for tweets, display those tweets and then search substrings of those tweets on Wikipedia.

TweetPedia is based off a boilerplate project I wrote (you can check it out [here](https://github.com/davidvuong/node-react-bp)). There are some really great boilerplates out there already like [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) but I wanted a deeper understand about how the various components fit together so I decided to write my own just as a learning exercise.

The boilerplate has a little bit more information about the various npm commands and what technologies are used so if this README isn't enough information, you check out the boilerplate for more details.

## Getting Started

1. Clone the git repository:

  ```bash
  git clone git@github.com:davidvuong/tweetpedia.git
  ```

1. Download the latest version of NodeJS (as of now, v5.7.1):

  ```bash
  nvm install v5.7.1
  nvm use v5.7.1
  ```

1. Install all the project dependencies:

  ```bash
  cd tweetpedia/
  npm install
  ```

## Executing TweetPedia

Before you can execute TweetPedia, you need to first configure your API keys. Please use the supplied `environment.json` file and place it in the root of your tweetpedia directory.

There are 3 commands you need to run:

```bash
# Compiles your client side JSX+ES6 and SCSS files into a bundle (bundle.js, style.css).
npm run watch:client

# Compiles all your server related JSX+ES6 files into a server.js bundle.
npm run watch:server

# Starts the NodeJS ExpressJS server using nodemon.
npm start
```

Whenever a change is made to any SCSS, ES6 or JSX files, your code will be re-compiled and [nodemon](https://github.com/remy/nodemon) will restart the NodeJS Express server. I've also setup ESLint to raise any warnings/errors if your code doesn't comply to the rules defined in `.eslintrc`.

## Running Tests

Tests are written utilising [Mocha](http://mochajs.org/), [React TestUtils](https://facebook.github.io/react/docs/test-utils.html), [mjackson/expect](https://github.com/mjackson/expect), [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store), and [nock](https://github.com/pgte/nock). There are 2 npm commands you can use to run tests:

```bash
# Runs your tests once.
npm test

# Runs your tests on every file change.
npm run test:watch
```
