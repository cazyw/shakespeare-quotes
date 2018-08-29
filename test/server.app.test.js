
/*
 * Shakespeare Quote App
 * Testing app.js
 */
'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/server');

const quote = {
  work: 'The Taming of the Shrew',
  act: '1',
  scene: '2',
  quote: 'O this learning, what a thing it is!',
  tags: ['learning', 'education', 'teaching']
};

const warningOutput = { warning: 'there\'s nothing here' };

describe('App', () => {

  after((done) => {
    app.close();
    done();
  });

  describe('GET ', () => {
    it('should return status 200 and render html on /', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .expect(/DOCTYPE html/i)
        .end(done);
    });

    it('should return status 404 on invalid routes', (done) => {
      request(app)
        .get('/api')
        .expect(404)
        .expect((res) => {
          expect(res.body).to.be.an('object').to.deep.include(warningOutput);
        })
        .end((err) => {
          if (err) return done(err);
        });

      request(app)
        .get('/random')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.an('object').to.deep.include(warningOutput);
        })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST ', () => {
    it('should return status 404 on invalid routes', (done) => {
      request(app)
        .post('/')
        .send(quote)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.be.an('object').to.deep.include(warningOutput);
        })
        .end((err) => {
          if(err) return done(err);
        });

      request(app)
        .post('/api')
        .send(quote)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.be.an('object').to.deep.include(warningOutput);
        })
        .end((err) => {
          if(err) return done(err);
        });

      request(app)
        .post('/random')
        .send(quote)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.be.an('object').to.deep.include(warningOutput);
        })
        .end((err) => {
          if(err) return done(err);
          done();
        });
    });
  });
});