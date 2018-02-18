
/*
 * Shakespeare Quote App
 * Testing Router.js (via App.js)
 */

const expect = require('chai').expect;
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('../server/app');
const {Quote} = require('../models/quote');

describe('hooks', function() {

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

  beforeEach((done) => {
    Quote.remove({})
        .then(() => {
          return Quote.insertMany(quotes);
        })
        .then(() => done);
  });

});


describe('GET /api/quotes', () => {
  it('should return all quotes', (done) => {
    request(app)
    .get('/api/quotes')
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.lengthOf(3);
    })
    .end(done)
  });
});

