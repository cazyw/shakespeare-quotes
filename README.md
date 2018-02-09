# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes. Users can submit quotes and search for quotes that have been tagged with certain keywords

## Status

Server-side routing mostly completed (working on local server). 
Currently working on  testing and front-end React and rendering components properly.

To do:

* refactor/modularise the front-end React and add form to post data to the database
* deploy to Heroku and research connecting to mongo 
* include tag suggestions and link tags so they become search terms
* user login

## Operating Instructions

<img src="" width="450" alt="">

## System Dependencies & Configuration

* node - v8.9.1
* npm - v5.6.0
* Heroku account to host the service
* Postman account if you wish to try posting to the service
* MongoDB and Robomongo

Other packages installed via npm
* "body-parser": "^1.18.2",
* "express": "^4.16.2",
* "mongoose": "^5.0.3",
* "react": "^16.2.0",
* "react-dom": "^16.2.0"
* "babel-core": "^6.26.0",
* "babel-loader": "^7.1.2",
* "babel-preset-env": "^1.6.1",
* "babel-preset-react": "^6.24.1",
* "chai": "^4.1.2",
* "css-loader": "^0.28.9",
* "mocha": "^5.0.0",
* "nodemon": "^1.14.12",
* "style-loader": "^0.20.1",
* "supertest": "^3.0.0",
* "webpack": "^3.10.0"

## Application Installation Instructions

Clone the repository.

Install node, npm
Install mongodb and robomongo for local server usage.


To install the required packages (see package.json), run:
```
$ npm install
```

Start the database locally (in my case):

```
$ mongod --dbpath ~/data/db/
```

Start the server locally:
```
$ npm start
```
Then open the browser and go to http://localhost:3000/

To rebuild the final js file (after any file changes), run:
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
  |- app.js
  |- routes.js
models/
  |- quote.js
public/
  |- index.html
  |- bundle.js
  |- styles.css

```

The working files that go into building `bundle.js`:

```
src/
  |- Home.js
  |- Button.jsx
  |- Button.css
```

Note: this section is being refactored to be done properly in React

## Testing

Testing using the `mocha` framework, and using the `supertest` and `chai` libraries

Since it connects to mongodb, the database needs to be running first (in my case):

```
$ mongod --dbpath ~/data/db/
```
Then run the following:

```
$ npm test
```

Note: do not run `npm start` or `npm run watch` at the same time as `npm test` as it will throw an error as they'll both try running a server on the same port. `npm test` script runs `webpack`, `nodemon` and `mocha` so file changes re-bundles the files, restarts the server and re-runs the tests.

## Discussion

The idea for this project came about because I participate in  a worldwide twitter event each Sunday - `#ShakespeareSunday`. Started by [@HollowCrownFans](https://twitter.com/HollowCrownFans?lang=en), every Sunday users around the world tweet Shakespeare quotes that follow a particular theme (e.g. light and dark).

I thought it'd be fun to build an online collection of Shakespeare quotes so I could save the quotes I'd selected each week and tag them with keywords. As themes are sometimes re-used or quotes might be applicable across multiple themes, this would be a way for me to see if any quotes I'd previously used match a theme. 

And it'd be a cool way for me to learn and put into practice routing, APIs, databases (MongoDB), React, forms and testing! An additional step I might add is logins and authentication.

### Server

Coding in Javascript, I again am using `Node.js` and the `express` framework to create my API. This time adding  `express.Router` to create modular route handlers. At the moment it's being used to handle the `/api/quotes` route but I may also add a `/api/users` route if I decide to add login/user features. The main `app.js` file sets up the server, and does the console logging and error handling. 

### Database and Modelling

I decided to use `MongoDB` as it's a popular database that would work well for my small application. NoSQL allows more flexibility in data structure. Information is stored in 'documents' rather in separate tables that all need to be joined together, and data is stored in JSON format, which works well with Javascript and the web.

The project required installing MongoDB (database), mongoose (object data modeling) and Robomongo (GUI to view the database).

In thinking on the model of the data, I looked at the information usually included in tweets and what information might be useful, deciding on:

* The title of the piece of work (play, sonnet etc) [required]
* The act [not required as the work may not have Acts]
* The scene [not required as the work may not have Scenes]
* The quote itself [required]
* Tags / keywords [required]

In future, each quote may be linked to the user posting the quote. 

### Display

The front-end is using `React`. Currently users are able to search tags and display quotes matching one or more of the tags entered. This section is still being worked on.

## Contributing
