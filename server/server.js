/* eslint-disable quotes */
/* eslint-disable no-console */
/*
 * Shakespeare Quote App
 * Main app server
 */

'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const config = require('../config').get(process.env.NODE_ENV);
require('dotenv').config;

const app = express();

// connect to mongodb
const options = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect(config.database, options)
  .catch(() => console.log('cannot connect to the database - check: is it running?'));
const db = mongoose.connection;
mongoose.Promise = global.Promise;

// log all db errors if in development
if (process.env.NODE_ENV === 'development') {
  db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log(`We are connected to the ${config.database} database!`));
}

// redirect to https
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      var secureUrl = 'https://' + req.headers['host'] + req.url;
      res.redirect(secureUrl);
    }
  }
  next();
});

// static files
// serve the react app files
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
// logger
app.use(morgan('combined'));

// initialise routes
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('*', (req, res) => {
  res.status(404).send({
    warning: "there's nothing here"
  });
});

app.post('*', (req, res) => {
  res.status(404).send({
    warning: "there's nothing here"
  });
});

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.message
  });
});

const port = process.env.PORT || 5000;
//eslint-disable-next-line no-console
let server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = server;
