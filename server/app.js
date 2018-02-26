/*
 * Shakespeare Quote App
 * Main app server
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config').get(process.env.NODE_ENV);

const app = express();

// connect to mongodb
const options = { connectTimeoutMS: 30 };
mongoose.connect(config.database, options).catch(() => console.log('cannot connect to the database - check: is it running?'));
const db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log(`We are connected to the ${config.database} database!`));
mongoose.Promise = global.Promise;

// log all server calls if in development
if (process.env.NODE_ENV === 'development'){
  app.use((req, res, next) => {
    const now = new Date().toString();
    console.log(`\t${now}: ${req.method} ${req.url}`);
    next();
  });
}


// static files
app.use('/', express.static(__dirname + '/../public'));

// parse JSON
app.use(bodyParser.json());


// initialise routes
app.use('/api', require('./routes'));

// warning - invalid route
app.get('*', (req, res, next) => {
  res.status(404).send({
    warning: 'there\'s nothing here'
  });
});

app.post('*', (req, res, next) => {
  res.status(404).send({
    warning: 'there\'s nothing here'
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {app}; // for testing