/*
 * Shakespeare Quote App
 * Main app server
 */
'use strict';

const express = require('express');
// const p3p = require('p3p');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('../config').get(process.env.NODE_ENV);

const app = express();

// connect to mongodb
const options = { connectTimeoutMS: 30000 };
mongoose.connect(config.database, options).catch(() => console.log('cannot connect to the database - check: is it running?'));
const db = mongoose.connection;
mongoose.Promise = global.Promise;

// log all server calls if in development
if (process.env.NODE_ENV === 'development'){
  db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log(`We are connected to the ${config.database} database!`));
  app.use((req, res, next) => {
    const now = new Date().toString();
    console.log(`Log -- ${now}: ${req.method} ${req.url}`);
    next();
  });
}

// static files
// serve the react app files
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser());
app.use(bodyParser.json());

// initialise routes
// app.use('/api', p3p(p3p.recommended), require('./routes'));
app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  res.status(404).send({
    warning: 'there\'s nothing here'
  });
});

app.post('*', (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {app}; // for testing