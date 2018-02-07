# Shakespeare Quotes App

## Objective

Create an online collection of Shakespeare quotes. Users can submit quotes and search for quotes that have been tagged with certain keywords

## Status

Server-side routing kind-of completed (working on local server). 

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

Install node, npm
Install mongodb and robomongo for local server usage.


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
working/
  |- shakespeare.js

## Testing

Will be using `mocha`, `chai` and `supertest`

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
