# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes for #ShakespeareSunday.

Users can:

- submit quotes into the collection
- search for quotes that have been tagged with certain keywords
- tweet quotes
- edit quotes
- delete quotes
- pagination when displaying more than 10 quotes

This is up and running here: https://shakespeare.cazyw.dev/

## Status

To do:

- hot module loading in docker container
- authentication
- refactor the react side and add testing

## Operating Instructions

Go to https://shakespeare.cazyw.dev/

<img src="https://raw.githubusercontent.com/cazyw/shakespeare-quotes/master/react-express-shakespeare.webp" width="450" alt="shakespeare sunday">

## System Dependencies & Configuration

Using docker containers in development.

For this app:

- node - v12.13.0
- npm - v6.12.x
- Heroku account for hosting (online)
- MongoDB (local - docker), mLab (online)
- Buildkite agent (for deployment via CI)

Check `package.json` for other packages installed. As I also used `create-react-app` for the front end; it has its own `package.json` in the client/ folder.

## Application Installation Instructions

Clone the repository.

### Docker

```Shell
# build and start the node and mongodb containers
make dockerUp

# get into the node docker container to execute commands
make dockerX

# stop and remove the docker containers
make dockerDown

# prune any stopped containers and unused images
make dockerPrune
```

The mongodb data is stored in a local data folder.

The following commands are also available:

```Shell
make npmInstall
make npmTest
make npmStart
```

### Inside docker

To install the other required packages (for both the Express server and React server), run:

```Shell
$ npm run install-all

# to build the react-front-end
$ npm run build-react
```

Start the Express server and React server (this also rebuilds when there are changes **to fix now that we are using docker**):

```Shell
$ npm run dev
```

Open the browser to http://localhost:5000/

The following was added to `package.json` to build and bundle the React/front-end files for production so the web app only runs on one server (Express server). Heroku automatically runs this.

```
"heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
```

### CI Deployment with Buildkite

The Github repository now includes a number of restrictions including:

- Require pull request reviews before merging
- Require status checks to pass before merging
- Deployment to Heroku on merge into master (and tests passing)

The status checks includes a webhook using Buildkite. Buildkite will run the automated tests and ensure they all pass.
Buildkite: https://buildkite.com

Buildkite requires an active agent in order to run and currently I am using an agent run on my local PC. The agent is started whenever a push is made up to the repository. [Notes on Buildkite setup](https://github.com/cazyw/templates-configs-tools/blob/master/notes/Buildkite.md)

## Project file structure

The project uses `react-scripts` to build the final front-end bundle for production. The following are the _main_ final project files:

Made with linux tree command

```
.
├── client
├── docker
├── docker-compose.yml
├── models
├── server
└── test

# express server
server
├── controllers
│   └── quotes.js
├── routes.js
└── server.js
models
└── quote.js

# react front-end
client/src
├── index.js
├── item-components
│   ├── ButtonForm.css
│   ├── ButtonForm.js
│   ├── QuoteItem.css
│   ├── QuoteItem.js
│   ├── QuoteList.js
│   └── Twitter_Logo_WhiteOnImage.png
├── page-components
│   ├── DisplayQuotes.css
│   ├── DisplayQuotes.js
│   ├── Header.css
│   ├── Header.js
│   ├── PostQuote.css
│   ├── PostQuote.js
│   ├── SearchQuote.css
│   ├── SearchQuote.js
│   ├── UpdateQuote.css
│   └── UpdateQuote.js
├── styles.css
└── utils
    ├── apiCalls.js
    ├── constants.js
    ├── errorHandling.js
    ├── helperFunctions.js
    └── updateDisplay.js
```

## Testing

Testing using the **mocha** framework, and using the **supertest** and **chai** libraries.

**to fix: chrome in docker**

Then run the following:

```
//run tests
$ npm test

// tests with coverage via Istanbul
$ npm run test-coverage

// tests with watch mode
$npm run test-watch

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

- The title of the piece of work (play, sonnet etc) [required]
- The act [conditional requirement - depends if Scene entered, must be a number]
- The scene [conditional requirement - depends if Act entered, must be a number]
- The quote itself [required]
- Tags / keywords [required]

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

Twitter's [Tweet Web Intent](https://dev.twitter.com/web/tweet-button/web-intent) is used to allow users to tweet quotes directly to Twitter.

### Testing

I am using the `mocha` framework, and using the `supertest` and `chai` libraries. It's been an interesting learning experience as I'm getting a better understanding of how to do testing. Setup and teardown functions have been added. At the moment the tests run against a test database and running server. I'll look into mocking the setup and unit-level testing.

`routes.test.js` uses the test database (so the development database is not used) and resets the database before each test. It tests that valid data posted to the database is saved, that invalid data is not, and that getting data from the database returns all data.

I have now also added Istanbul for code coverage. This has been very useful to see whether I've added tests for various parts of the source code and armed with this knowledge I aim to increase code coverage. Having used Sinon at work for mocking, I've now also added it to this project.

### Downloading of Shakespeare's works for analysis

As well as manually searching for quotes and then adding them to this application, I decided to build a feature that would automatically scan and retrieve quotes that matched the given keyword. This part of the project is still a work in progress. At the moment I'm using `Puppeteer` to retrieve the list of shakespeare's works from the [MIT Shakespeare site](http://shakespeare.mit.edu/). Currently I've been able to download the full text of each piece of work (plays and sonnets/poems).

Using `sanitize-html`, I've been able to remove all HTML tags. The next steps will be to:

- reformat the HTML into a more useful structure

At the moment the text is in it's original short-length structure, with sentences split across multiple lines. I'll then need to consider how to best reformat and store the text to be able to search for and retrieve quotes/sentences.

## Contributing

Carol Wong
