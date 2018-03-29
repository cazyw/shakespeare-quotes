# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes. Users can submit quotes and search for quotes that have been tagged with certain keywords.

A rough version is up and running here: https://shakespeare-sunday.herokuapp.com/

## Status

Simple server-side routing mostly completed. 
Currently working on refactoring and restructuring the code, testing and adding futher validation to the modle schema.
Will look into adding: login (to delete/modify quotes), better data validation/suggestions.

## Operating Instructions

Go to https://shakespeare-sunday.herokuapp.com/

You can:

* add quotes
* search for quotes (via tags)
  * the search terms do not need to be exact, but the tag must contain the search term e.g. searching for 'love' will also retrieve any quotes tagged 'loves'
* display all quotes in the database

<img src="" width="450" alt="">

## System Dependencies & Configuration

For this app:
* node - v8.9.1
* npm - v5.8.0
* Heroku account to host the service if using online
* Postman account if you wish to try posting to the API without using the front end
* MongoDB and Robomongo (local), mLab (production))

Check `package.json` for other packages installed

## Application Installation Instructions

Clone the repository.

Install node, mongodb and robomongo for local server usage. To install the required packages (see package.json), run:
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

Or to watch for and rebuild automatically after any changes (**webpack**) AND automatically re-start the server if there are changes there as well (**nodemon**), run:
```
$ npm run watch
```

For online production, accounts were setup in **Heroku** and **mLab**

## Project file structure

The project uses webpack.js to build the final Javascript file. The following are the final project files:
```
server/
  |- controllers/
      |- quotes.js
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
  |- Index.js
  |- Header.js
  |- item-components/
      |- ButtonForm.js
      |- QuoteList.js
      |- QuoteItem.js
  |- page-components/
      |- Header.js
      |- PostQuote.js
      |- SearchQuote.js
      |- DisplayQuotes.js
      
```

## Testing

Testing using the **mocha** framework, and using the **supertest** and **chai** libraries. Since it connects to mongodb, the database needs to be running first (in my case):

```
$ mongod --dbpath ~/data/db/
```
Then run the following:

```
$ npm run test-watch
```

Note: do not run the other scripts at the same time as `npm run test-watch` as it will throw an error as multiple scripts will try running multiple servers on the same port. `npm run test-watch` script runs **webpack**, **nodemon** and **mocha** so file changes re-bundles the files, restarts the server and re-runs the tests.

This section is a work in progress as I develop more thorough testing practices. I'll also need to write unit tests that use mocking as at the moment my tests actually rely on an active database and server. 

## Discussion

The idea for this project came about because I participate in  a worldwide twitter event each Sunday - `#ShakespeareSunday`. Started by [@HollowCrownFans](https://twitter.com/HollowCrownFans?lang=en), every Sunday users around the world tweet Shakespeare quotes that follow a particular theme (e.g. light and dark).

I thought it'd be fun to build an online collection of Shakespeare quotes so I could save the quotes I'd selected each week and tag them with keywords. As themes are sometimes re-used or quotes might be applicable across multiple themes, this would be a way for me to see if any quotes I'd previously used match a theme. 

And it'd be a cool way for me to learn and put into practice routing, Express, APIs, databases (MongoDB), React, forms and testing! An additional step I might add is authentication. 

### Setup and Environment

As I build more complicated apps, I've been learning to integrate more features (e.g. mongoDB in this case) and delve into more complicated `webpack.config.js` and `package.json` setups . It was a challenge to get the scripts watching for various changes without throwing errors due to existing servers and schemas (mostly during testing). I learnt that `&` runs scripts concurrently and `&&` runs them sequentially. 

A new step for me in this project was to add a `config.js` file that included different settings for production (push to Heroku), development (locally) and testing (for testing). This was particularly important as I wanted my test cases to run against a test database and not the local database (otherwise clearing the database for testing wipes out all my data). 

I also used ESLint in this project and am getting to know some of the settings and configuration options.

### Server

Coding in Javascript, I again am using `Node.js` and the `express` framework to create my API. This time adding  `express.Router` to create modular route handlers and separating the controller logic into its own file. The main `app.js` file sets up the server, and does the console logging and error handling. 

### Database and Modelling

I decided to use `MongoDB` as it's a popular database that would work well for my small application. NoSQL allows more flexibility in data structure. Information is stored in 'documents' rather in separate tables that all need to be joined together, and data is stored in JSON format, which works well with Javascript and the web.

The project required installing MongoDB (database) and mongoose (object data modeling).

In thinking on the model of the data, I looked at the information usually included in tweets and what information might be useful, deciding on:

* The title of the piece of work (play, sonnet etc) [required]
* The act [conditional requirement - depends if Scene entered]
* The scene [conditional requirement - depends if Act entered]
* The quote itself [required]
* Tags / keywords [required]

At the moment there's not a lot of deep validation (e.g. checking whether the work/act/scene is correct).

For online storage, I went with `mLab` as it can be added as an add-on to Heroku, has a free tier and is a cloud Database-as-a-Service for MongoDB. It uses AWS cloud storage. Although the free 'sandbox' database should not be used in production, as this is a personal project, I'm using this free but less-reliable option. The `config` file selects the correct database (online, local, test) depending on the `NODE_ENV` setting.

### Display

This section is still being worked on. This is my first real dive into React so it's been a learning experience looking at how to build the front-end using React components, how to dynamically render content based on its state and pass data between parent and child elements. I'm going through Stephen Grider's course on Udemy [Modern React with Redux](https://www.udemy.com/react-redux/) as a foundation for how to use React but applying it to my own project. Currently my setup is a bit ad-hoc but as I go through this course, I intend to refactor as necessary.

### Testing

This is an ongoing work in progress as I learn how to do testing with APIs and databases. I am using the `mocha` framework, and using the `supertest` and `chai` libraries. It's been an interesting learning experience as I'm getting a better understanding of how to do testing. Setup and teardown functions have been added. At the moment the tests run against a test database and running server. I'll look into mocking the setup and unit-level testing.

`routes.test.js` uses the test database (so the development database is not used) and resets the database before each test. It tests that valid data posted to the database is saved, that invalid data is not, and that getting data from the database returns all data. 

`quotes.test.js` tests the MongoDB/mongoose schema.

## Contributing
Carol Wong
