const { Quote } = require('../../models/quote');

const collateTags = (tags) => {
  return tags.split(' ')
    .map(tag => tag.trim())
    .map(tag => new RegExp(tag, 'i'));
};

const displayAllQuotes = (res, next) => {
  Quote.find({}).sort( '-created_date' )
    .exec()
    .then(quote => res.send(quote))
    .catch(error => next(error)); // passes error to app.js
};

const displaySelectedQuotes = (res, selectedTags, next) => {
  Quote.find({ tags: { $in: selectedTags } })
    .exec()
    .then(quote => res.send(quote))
    .catch(error => next(error)); // passes error to app.js
};

function retrieveRandomQuote(req, res, next) {
  Quote.aggregate([{ $sample: { size: 1 } }])
    .then(quote => res.send(quote))
    .catch(error => next(error));
}

function setCookieTest(req, res, next) {
  // Add headers
  const origin = req.get('origin');
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', origin);

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  var expiry = new Date();
  expiry.setMonth(myDate.getMonth() + 1);

  res.cookie('shakespeare-cookie', 'whatFoolsTheseMortalsBe', { domain: '.shakespeare-sunday.herokuapp.com', path: '/', expires: expiry});
  res.send(204);
  console.log(`test cookie set`);
}


function retrieveQuotes(req, res, next) {
  if(!req.query.tags){
    displayAllQuotes(res, next);
  } else {
    const selectedTags = collateTags(req.query.tags);
    displaySelectedQuotes(res, selectedTags, next);
  }
}

function postQuote(req, res, next) {
  // save new instance of a quote (returns a promise)
  Quote.create(req.body)
    .then(quote => res.json(quote))
    .catch(error => next(error)); // passes error to app.js
}

function updateQuote(req, res, next) {
  Quote.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Quote.findOne({_id: req.params.id})
        .then(quote => res.send(quote));
    })
    .catch(next); // passes error to app.js
}

function deleteQuote(req, res, next) {
  Quote.findByIdAndRemove({
    _id: req.params.id
  })
    .then(quote => res.send(quote))
    .catch(next); // passes error to app.js
}

module.exports = {
  collateTags,
  retrieveRandomQuote,
  displayAllQuotes,
  displaySelectedQuotes,
  retrieveQuotes,
  postQuote,
  updateQuote,
  deleteQuote,
  setCookieTest
};