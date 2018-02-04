const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/shakespeare');
mongoose.Promise = global.Promise;

app.use('/', express.static(__dirname + '/../public'));

// parse JSON
app.use(bodyParser.json());

// initialise routes
app.use('/api', require('./routes'));

// log server calls
app.use(function(req, res, next){
  const now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

// error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({
    error: err.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));