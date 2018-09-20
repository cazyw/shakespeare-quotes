
/*
 * Shakespeare Quote App
 * Testing routes.js (via app.js)
 */
'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server');
const { Quote } = require('../models/quote');
const { quotes, validQuotes, invalidQuotes, caseQuotes, updatedQuotes } = require('./helpers');

const MONGO_URI = 'mongodb://localhost/testDatabase';

describe('Routes', () => {

  before((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    if(!mongoose.connection.readyState) {
      mongoose.connect(MONGO_URI).then(() => done());
    } else {
      // console.log('Error: mongodb has not been started. Run mongod --dbpath ~/data/db');
      done();
    }
  });

  after((done) => {
    app.close();
    if(mongoose.connection.db) {
      mongoose.connection.db.dropDatabase().then(() => {
        mongoose.connection.close();
        done();
      });
    } else {
      done();
    }
  });

  beforeEach(function(done){
    this.timeout(2000);
    Quote.remove({})
      .then(() => {
        return Quote.insertMany(quotes);
      })
      .then(() => done());
  });

  describe('GET /api/quotes', () => {

    it('should return all quotes', (done) => {
      request(app)
        .get('/api/quotes')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(3);
          if (err) return done(err);
          done();
        });
    });

    it('should return a subset if a tag that exists in the db is provided', (done) => {
      request(app)
        .get('/api/quotes')
        .query({ tags: 'learning' })
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(1);
          expect(res.body[0].work).to.equal(quotes[0].work);
          if(err) return done(err);
        });

      request(app)
        .get('/api/quotes')
        .query({ tags: 'suprise doubt'} )
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0].work).to.equal(quotes[1].work);
          expect(res.body[1].work).to.equal(quotes[2].work);
          if(err) return done(err);
          done();
        });
    });

    it('should return entries where the seach term is part of a tag word (but not quote)', (done) => {
      request(app)
        .get('/api/quotes')
        .query({ tags: 'learn' })
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(1);
          expect(res.body[0].work).to.equal(quotes[0].work);
          if(err) return done(err);
        });

      request(app)
        .get('/api/quotes')
        .query({tags: 'learn teach accident'})
        .end((err, res) => {
          expect(res.body).to.be.lengthOf(2);
          expect(res.body[0].work).to.equal(quotes[0].work);
          expect(res.body[1].work).to.equal(quotes[2].work);
          if(err) return done(err);
          done();
        });
    });

    it('should return entries where the seach term is part of a quote (but not a tag)', (done) => {
      request(app)
        .get('/api/quotes')
        .query({ tags: 'sport' })
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(1);
          expect(res.body[0].work).to.equal(quotes[2].work);
          if(err) return done(err);
          done();
        });
    });

    it('should return no entries if a search term is not in a tag or quote', (done) => {
      request(app)
        .get('/api/quotes')
        .query({tags: 'England'})
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(0);
          expect(res.body).to.be.an('array').that.is.empty;
          if(err) return done(err);
          done();
        });
    });

  });

  describe('GET /api/quotes/random', () => {

    it('should return one quote', (done) => {
      request(app)
        .get('/api/quotes/random')
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(1);
          expect(res.body[0]).to.be.an('object').that.has.any.keys('work');
          if(err) return done(err);
          done();
        });
    });
  });

  describe('POST /api/quotes', () => {

    it('should create a quote with valid data (all fields completed)', (done) => {
      request(app)
        .post('/api/quotes')
        .send(validQuotes[0])
        .expect(200)
        .end((err, res) => {
          expect(res.body.work).to.equal(validQuotes[0].work);
          if (err) return done(err);

          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(4);
            expect(quotes[3].quote).to.equal(validQuotes[0].quote);
            done();
          }).catch((e) => done(e));
        });
    });

    it('should create a quote with valid data (neither act nor scene completed)', (done) => {
      request(app)
        .post('/api/quotes')
        .send(validQuotes[1])
        .expect(200)
        .end((err, res) => {
          expect(res.body.work).to.equal(validQuotes[1].work);
          if (err) return done(err);

          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(4);
            expect(quotes[3].quote).to.equal(validQuotes[1].quote);
            done();
          }).catch((e) => done(e));
        });
    });

    it('should not create a quote if fields are not all completed', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuotes)
        .expect(422)
        .end((err, res) => {
          expect(res.body).to.have.key('error');
          if (err) return done(err);

          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(3);
            done();
          }).catch((e) => done(e));
        });
    });

    it('should convert tags to lower case', (done) => {
      request(app)
        .post('/api/quotes')
        .send(caseQuotes)
        .expect(200)
        .end((err, res) => {
          expect(res.body.work).to.equal(caseQuotes.work);
          if(err) return done(err);

          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(4);
            expect(quotes[3].tags).to.include('grief');
            expect(quotes[3].tags).to.not.include('Joy');
            done();
          }).catch((e) => done(e));
        });
    });

  });

  describe('DELETE /api/quotes/:id', () => {
    it('should delete the quote given a valid id', (done) => {
      request(app)
        .delete(`/api/quotes/${quotes[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.work).to.equal('The Taming of the Shrew');
          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(2);
            done();
          }).catch((e) => done(e));
        });
    });

    it('should not delete any quotes given an invalid id', (done) => {
      request(app)
        .delete('/api/quotes/1234567890')
        .expect(422)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.have.property('error');
          Quote.find().then((quotes) => {
            expect(quotes).to.have.lengthOf(3);
            done();
          }).catch((e) => done(e));
        });
    });
  });

  describe('PUT /api/quotes/:id', () => {
    it('should update the quote given a valid id', (done) => {
      request(app)
        .put(`/api/quotes/${quotes[0]._id}`)
        .send(updatedQuotes)
        .expect(200)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.tags).to.include.members(['hollow crown', 'rare']);
          done();
        });
    });

    it('should not update a quote given an invalid id', (done) => {
      request(app)
        .put('/api/quotes/12345678')
        .send(updatedQuotes)
        .expect(422)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

});