# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes. Users can submit quotes and search for quotes that have been tagged with certain keywords

A very very rough version (look and style is in serious need of work) is up and running here: https://shakespeare-sunday.herokuapp.com/

## Status

Server-side routing mostly completed (working on local server). 
Currently working on testing and front-end React and rendering components properly.

To do:

* refactor/modularise the front-end React properly
* delete and modify tags
* include tag suggestions and link tags so they become search terms
* user login
* testing
* add pagination (when displaying quotes)

## Operating Instructions

Go to https://shakespeare-sunday.herokuapp.com/

You can:

* add quotes
* search for quotes (via keywords)
* display all quotes in the database

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

Start the database locally (in my case path required as not stored in the default location):

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
  |- index.js
  |- button-components/
      |- ButtonForm.js
      |- ButtonDisplay.js
      |- Button.css
  |- quote-components/
      |- PostQuote.js
      |- PostQuote.css
      |- DisplayQuote.js
      |- DisplayQuote.css
      |- QuoteList.js
      |- QuoteItem.js
      |- Quote.css
```

Note: this section and structure is being refactored as I'm still learning React

## Testing

Testing using the `mocha` framework, and using the `supertest` and `chai` libraries

Since it connects to mongodb, the database needs to be running first (in my case):

```
$ mongod --dbpath ~/data/db/
```
Then run the following:

```
$ npm run test-watch
```

Note: do not run `npm start` or `npm run watch` at the same time as `npm run test-watch` as it will throw an error as they'll both try running a server on the same port. `npm run test-watch` script runs `webpack`, `nodemon` and `mocha` so file changes re-bundles the files, restarts the server and re-runs the tests.

This section is a work in progress. 


## Discussion

The idea for this project came about because I participate in  a worldwide twitter event each Sunday - `#ShakespeareSunday`. Started by [@HollowCrownFans](https://twitter.com/HollowCrownFans?lang=en), every Sunday users around the world tweet Shakespeare quotes that follow a particular theme (e.g. light and dark).

I thought it'd be fun to build an online collection of Shakespeare quotes so I could save the quotes I'd selected each week and tag them with keywords. As themes are sometimes re-used or quotes might be applicable across multiple themes, this would be a way for me to see if any quotes I'd previously used match a theme. 

And it'd be a cool way for me to learn and put into practice routing, APIs, databases (MongoDB), React, forms and testing! An additional step I might add is logins and authentication.

### Setup and Environment

As I build more complicated apps, I've been learning to integrate more features (e.g. mongoDB in this case) and delve into more complicated `webpack.config.js` and `package.json` setups. A new step for me in this project was to add a `config.js` file that included different settings for production (push to Heroku), development (locally) and test (for testing). This was particularly important as I wanted my test cases to run against a test database and not the local database (otherwise clearing the database for testing wipes out all my data). 

### Server

Coding in Javascript, I again am using `Node.js` and the `express` framework to create my API. This time adding  `express.Router` to create modular route handlers. At the moment it's being used to handle the `/api/quotes` route but I may also add a `/api/users` route if I decide to add login/user features. The main `app.js` file sets up the server, and does the console logging and error handling. 

### Database and Modelling

I decided to use `MongoDB` as it's a popular database that would work well for my small application. NoSQL allows more flexibility in data structure. Information is stored in 'documents' rather in separate tables that all need to be joined together, and data is stored in JSON format, which works well with Javascript and the web.

The project required installing MongoDB (database), mongoose (object data modeling) and Robomongo (GUI to view the database).

In thinking on the model of the data, I looked at the information usually included in tweets and what information might be useful, deciding on:

* The title of the piece of work (play, sonnet etc) [required]
* The act [conditional requirement - depends if Scene entered]
* The scene [conditional requirement - depends if Act entered]
* The quote itself [required]
* Tags / keywords [required]

In future, each quote may be linked to the user posting the quote. 

For online storage, I went with `mLab` as it can be added as an add-on to Heroku, has a free tier and is a cloud Database-as-a-Service for MongoDB. It uses AWS cloud storage. Although the free 'sandbox' database should not be used in production, as this is a personal project, I'm using this less-reliable option. The `config` file selects the correct database (online, local, test) depending on the `NODE_ENV` setting.

### Display

The front-end is using `React`. Currently users are able to:
* submit quotes to be entered into the collection
* display all quotes in the collection
* display quotes that match a keyword

This section is still being worked on. This is my first real dive into React so it's been a learning experience looking at how to build the front-end using React components, how to dynamically render content based on its state and pass data between parent and child elements. I'm going through Stephen Grider's course on Udemy [Modern React with Redux](https://www.udemy.com/react-redux/) as a foundation for how to use React but applying it to my own project. Currently my setup is a bit ad-hoc but as I go through this course, I intend to refactor as necessary.

### Testing

This is an ongoing work in progress as I learn how to do testing with APIs and databases. I am using the `mocha` framework, and using the `supertest` and `chai` libraries. It's been an interesting learning experience as I'm getting a better understanding of how to do testing

`routes.test.js` sets up a test database (so the development database is not used) and resets the database before each test. It tests that valid data posted to the database is saved, and that getting data from the database returns all data. The next steps will be to test what happens when invalid data is sent. The mongoDB schema will also need to be tested



## Contributing
