
/*
 * Shakespeare Quote App
 * Testing routes.js (via app.js)
 */

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const {app} = require('../server/app');
const {Quote} = require('../models/quote');

const quotes = [{
  _id: new ObjectID(),
  work: "The Taming of the Shrew",
  act: "1",
  scene: "2",
  quote: "O this learning, what a thing it is!",
  tags: ["learning", "education", "teaching"]
},
{
  _id: new ObjectID(),
  work: "Hamlet",
  act: "3",
  scene: "2",
  quote: "Where love is great, the littlest doubts are fear. Where little fears grow great, great love grows there.",
  tags: ["love", "fear", "doubt", "protect"]
},
{
  _id: new ObjectID(),
  work: "Henry IV Part 1",
  act: "1",
  scene: "2",
  quote: "If all the year were playing holidays, to sport would be as tedious as to work; But when they seldom come, they wished-for come, and nothing pleaseth but rare accidents.",
  tags: ["holiday", "accidents", "rare", "work", "suprise"]
}];

const validQuotes = [{
  work: "Sonnet 50",
  act: "",
  scene: "",
  quote: "For that same groan doth put this in my mind; My grief lies onward, and my joy behind.",
  tags: ["grief", "joy"]
},
{
  work: "Henry V",
  act: "4",
  scene: "1",
  quote: "I am afeard there are few die well that die in a battle...",
  tags: ["death", "battle", "war"]
}];


before((done) => {
  mongoose.connect('mongodb://localhost/testDatabase');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('We are connected to test database!');
    done();
  });
});


after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    console.log('Disconnected from the test database!');
    mongoose.connection.close(done);
  });
});



describe('GET /api/quotes', () => {
  beforeEach((done) => {
    console.log('running delete');
    Quote.remove({})
        .then(() => {
          return Quote.insertMany(quotes);
        })
        .then(() => done());
  });
  it('should return all quotes', (done) => {
    request(app)
    .get('/api/quotes')
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.lengthOf(3);
      expect(res.body[0].work).to.equal(quotes[0].work);
    })
    .end((err) => {
      if (err) return done(err);
      done();
    })
  });
});

describe('POST /api/quotes', () => {
  beforeEach((done) => {
    console.log('running delete');
    Quote.remove({})
        .then(() => {
          return Quote.insertMany(quotes);
        })
        .then(() => done());
  });
  it('should create a valid quote with valid data', (done) => {
    request(app)
    .post('/api/quotes')
    .send(validQuotes[0])
    .expect(200)
    .expect((res) => {
      expect(res.body.work).to.equal(validQuotes[0].work)
    })
    .end((err, res) => {
      if (err) return done(err);

      Quote.find().then((quotes) => {
        expect(quotes).to.have.lengthOf(4);
        expect(quotes[3].quote).to.equal(validQuotes[0].quote);
        done();
      }).catch((e) => done(e));
      
    });
  });
});

