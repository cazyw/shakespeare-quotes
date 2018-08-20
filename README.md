# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes. Users can
* submit quotes into the collection
* search for quotes that have been tagged with certain keywords
* tweet quotes
* edit quotes
* delete quotes
* pagination when displaying more than 10 quotes
* automatically generate a number of quotes (to do)

This is up and running here: https://shakespeare-sunday.herokuapp.com/

## Status

To do:
* refactor/review React state handling

Also working on a feature that will automatically find a number of quotes based on search terms. Complete works are located here: http://shakespeare.mit.edu/index.html. At the moment I am searching for quotes in google and manually adding the ones I like. The idea with this will be for the app to find quotes that match keywords and I can select which ones to add to my collection. Still to work out how to implement this efficiently.

## Operating Instructions

Go to https://shakespeare-sunday.herokuapp.com/. May take a while to spin up (using free Heroku and mLab tier)

<img src="https://cazyw.github.io/img/react-express-shakespeare.jpg" width="450" alt="shakespeare subday">

## System Dependencies & Configuration

For this app:
* node - v8.9.1
* npm - v5.8.0
* Heroku account (online)
* MongoDB (local), mLab (online)

Check `package.json` for other packages installed. As I also used `create-react-app` for the front end; it has its own `package.json` in the client/ folder.

## Application Installation Instructions

Clone the repository.

Install node and mongodb for local server usage. To install the other required packages (for both the Express server and React server), run:
```
$ npm run install-all
```

Start the database locally (in my case path required as not stored in the default location):

```
$ mongod --dbpath ~/data/db/
```

Start the Express server and React server (this also rebuilds when there are changes):
```
$ npm run dev
```

This will automatically open the browser to http://localhost:3000/

The following was added to `package.json` to build and bundle the React/front-end files for production so the web app only runs on one server (Express server). Heroku automatically runs this.
```
"heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
```


## Project file structure

The project uses `react-scripts` to build the final front-end bundle for production. The following are the *main* final project files:
```
server/
  |- server.js
  |- routes.js
  |- controllers/
      |- quotes.js
models/
  |- quote.js
client/
  |- build
    |- index.html
    |- static/
        |- css
        |- js
        |- media

```

The working files that go into the React front-end (excluding `.css` files):

```
src/
  |- index.js
  |- page-components/
      |- Header.js
      |- PostQuote.js
      |- SearchQuote.js
      |- DisplayQuotes.js
  |- item-components/
      |- ButtonForm.js
      |- QuoteList.js
      |- QuoteItem.js
  |- utils/
      |- apiCalls.js
      |- constants.js
      |- errorHandling.js
      |- helperFunctions.js
      |- updateDisplay.js

```

## Testing

Testing using the **mocha** framework, and using the **supertest** and **chai** libraries. Since it connects to mongodb, the database needs to be running first (in my case):

```
$ mongod --dbpath ~/data/db/
```
Then run the following:

```
$ npm test
```

To do: testing for React front-end.

## Discussion

The idea for this project came about because I participate in a worldwide twitter event each Sunday - `#ShakespeareSunday`. Started by [@HollowCrownFans](https://twitter.com/HollowCrownFans?lang=en), every Sunday users around the world tweet Shakespeare quotes that follow a particular theme (e.g. light and dark).

I thought it'd be fun to build an online collection of Shakespeare quotes I use. And it'd be a cool way for me to learn and put into practice Node, Express, APIs, databases (MongoDB), React, forms and testing!

### Setup and Environment

New frameworks used in this project include mongoDB and React. I also added a `config.js` file that included different settings for production (Heroku), development (locally) and testing (for testing). This was particularly important as I wanted my test cases to run against a test database and not the local development database.

Initially I had used Webpack to build my final `.js` file however once I looked more into React, I decided to use the `create-react-app` package which black-boxes the transpiling and compiling of React (webapck and babel configuration).

I also used ESLint in this project and am getting to know some of the settings and configuration options. To run eslint in the console:
```
$ npm run lint
```

### Server

Using `Node.js` and the `express` framework to create my API. This time adding `express.Router` to create modular route handlers and separating the controller logic into its own file. The main `server.js` file sets up the server, and does the console logging and error handling.

A separate server is run (in development) for the React front-end (based on the `create-react-app` package).

### Database and Modelling

I decided to use `MongoDB` as it's a popular database that would work well for my small application. NoSQL allows more flexibility in data structure. Information is stored in 'documents' rather in separate tables that all need to be joined together, and data is stored in JSON format, which works well with Javascript and the web.

Data model:

* The title of the piece of work (play, sonnet etc) [required]
* The act [conditional requirement - depends if Scene entered, must be a number]
* The scene [conditional requirement - depends if Act entered, must be a number]
* The quote itself [required]
* Tags / keywords [required]

At the moment there's not a lot of deep validation, although the Work must be listed in the predifined list of works (sonnets not currently included).

For online storage, I went with `mLab` as it can be added as an add-on to Heroku, has a free (albeit slower) tier and is a cloud Database-as-a-Service for MongoDB. The `config` file selects the correct database (online, local, test) depending on the `NODE_ENV` setting.

#### Notes

Exporting and importing a file into the local database (drop to remove existing data):
```
$ mongoexport --db shakespeare --collection quotes --out <filename>.json
$ mongoimport --db shakespeare --collection quotes --drop --file ./<filename>.json
```

### Front-End

This is my first real dive into React so it's been a learning experience looking at how to build the front-end using React components, how to dynamically render content based on its state and pass data between parent and child elements. Initially I setup webpack and its configuration myself however I decided to switch to the `create-react-app` package as that includes some additional features/minification of files. Also using react-bootstrap.

Added some functions to perform basic form validation checks however doesn't check that the details entered are necessarily correct.

Pagination has now also been added using react-paginate. It was a good experience diving into their `demo.js` code and modifying it for this app's requirements.

### APIs / External Functionality Used

Looking to use [Wordnik API](http://api.wordnik.com) to assist with keyword (tag) searching. In order to identify quotes that may be relevant, some manipulation of search terms will be done such as
* searching for plural and singular versions of a tag
* searching for synonyms

The API will be used to retrieve synonyms of keywords entered.

Twitter's [Tweet Web Intent](https://dev.twitter.com/web/tweet-button/web-intent) is used to allow users to tweet quotes directly to Twitter.

### Testing

I am using the `mocha` framework, and using the `supertest` and `chai` libraries. It's been an interesting learning experience as I'm getting a better understanding of how to do testing. Setup and teardown functions have been added. At the moment the tests run against a test database and running server. I'll look into mocking the setup and unit-level testing.

`routes.test.js` uses the test database (so the development database is not used) and resets the database before each test. It tests that valid data posted to the database is saved, that invalid data is not, and that getting data from the database returns all data.

## Contributing
Carol Wong
