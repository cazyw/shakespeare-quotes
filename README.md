# Shakespeare Quotes App

## Objective

Create a database where users can submit Shakespeare quotes and search for quotes that have been tagged with keywords

## Status

Server-side kind-of completed (working on local server). 

To do:

* deploy to Heroku and research connecting to mongo (mLab)
* add form to post data to database

## Operating Instructions

<img src="" width="450" alt="">

## System Dependencies & Configuration

* node - v8.9.1
* npm - v5.6.0
* Heroku account to host the service
* Postman account if you wish to try posting to the service
* MongoDB and Robomongo

Other packages installed via npm

* express - v4.16.2
* body-parser - v1.18.2
* mongoose - v5.0.3
* react - 16.2.0
* react-dom - 16.2.0
* nodemon - v1.14.11 (development env)
* babel-core - v6.26.0 (development env)
* babel-loader - v7.1.2 (development env)
* babel-preset-env - v1.6.1 (development env)
* babel-preset-react - 6.24.1 (development env)
* nodemon - v1.14.12 (development env)
* webpack - v3.10.0 (development env)

## Application Installation Instructions

Clone the repository.

Install node, npm and mongodb and robomongo.


To install the required packages (see package.json), run:
```
$ npm install
```

Start the server locally:
```
$ npm start
```
Then open the browser and go to http://localhost:3000/

To rebuild (after any file changes), run:
```
$ npm run build
```

Or to watch for and rebuild automatically after any changes (`webpack`) AND automatically re-start the server if there are changes there as well (`nodemon`), run:
```
$ npm run watch
```

## Project file structure

The project uses webpack.js to build the final Javascript file. The following are the final project files:
```
server/
  |- server.js
  |- routes.js
models/
  |- quote.js
public/
  |- index.html
  |- bundle.js
  |- styles.css

```

## Testing

## Discussion

## Contributing
