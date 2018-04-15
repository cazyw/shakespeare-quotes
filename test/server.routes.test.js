
/*
 * Shakespeare Quote App
 * Testing routes.js (via app.js)
 */
'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server');
const {Quote} = require('../models/quote');

const MONGO_URI = 'mongodb://localhost/testDatabase';

const quotes = [{
  work: 'The Taming of the Shrew',
  act: '1',
  scene: '2',
  quote: 'O this learning, what a thing it is!',
  tags: ['learning', 'education', 'teaching']
},
{
  work: 'Hamlet',
  act: '3',
  scene: '2',
  quote: 'Where love is great, the littlest doubts are fear. Where little fears grow great, great love grows there.',
  tags: ['love', 'fear', 'doubt', 'protect']
},
{
  work: 'Henry IV Part 1',
  act: '1',
  scene: '2',
  quote: 'If all the year were playing holidays, to sport would be as tedious as to work; But when they seldom come, they wished-for come, and nothing pleaseth but rare accidents.',
  tags: ['holiday', 'accidents', 'rare', 'work', 'suprise']
}];

const validQuotes = [{
  work: 'Sonnet 50',
  act: '',
  scene: '',
  quote: 'For that same groan doth put this in my mind; My grief lies onward, and my joy behind.',
  tags: ['grief', 'joy']
},
{
  work: 'Henry V',
  act: '4',
  scene: '1',
  quote: 'I am afeard there are few die well that die in a battle...',
  tags: ['death', 'battle', 'war']
}];

const invalidQuote = [
  {
    work: '',
    act: '4',
    scene: '1',
    quote: 'I am afeard there are few die well that die in a battle...',
    tags: ['death', 'battle', 'war']
  } ,
  {
    work: 'Henry V',
    act: '',
    scene: '1',
    quote: 'I am afeard there are few die well that die in a battle...',
    tags: ['death', 'battle', 'war']
  } ,
  {
    work: 'Henry V',
    act: '4',
    scene: '',
    quote: 'I am afeard there are few die well that die in a battle...',
    tags: ['death', 'battle', 'war']
  } ,
  {
    work: 'Henry V',
    act: '4',
    scene: '1',
    quote: '',
    tags: ['death', 'battle', 'war']
  } ,
  {
    work: 'Henry V',
    act: '4',
    scene: '1',
    quote: 'I am afeard there are few die well that die in a battle...',
  } ,
];

const caseQuote = {
  work: 'Sonnet 50',
  act: '',
  scene: '',
  quote: 'For that same groan doth put this in my mind; My grief lies onward, and my joy behind.',
  tags: ['Grief', 'Joy']
};

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

    it('should return entries where the seach term is part of a tag word', (done) => {
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

    it('should return no entries if a tag with no matches in the db is provided', (done) => {
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

    it('should not create a quote if "work" is missing', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuote[0])
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

    it('should not create a quote if "act" is missing', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuote[1])
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

    it('should not create a quote "scene" is missing', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuote[2])
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

    it('should not create a quote if "quote" is missing', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuote[3])
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

    it('should not create a quote if "tag" is missing', (done) => {
      request(app)
        .post('/api/quotes')
        .send(invalidQuote[4])
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
        .send(caseQuote)
        .expect(200)
        .end((err, res) => {
          expect(res.body.work).to.equal(caseQuote.work);
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

});