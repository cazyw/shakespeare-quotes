
/*
 * Shakespeare Quote App
 * Testing App.js
 */

const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../server/app');

describe('GET /', () => {
  it('should return status 200 and render html', (done) => {
    request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .expect(/DOCTYPE html/)
    .end(done)
  });
});

describe('GET /<incorrect route>', () => {
  it('should return status 404 on /api', (done) => {
    const expectedOutput = { warning: "there's nothing here" };
    request(app)
    .get('/api')
    .expect(404)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(expectedOutput)
    }, done)
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });

  it('should return status 404 on /random', (done) => {
    const expectedOutput = { warning: "there's nothing here" };
    request(app)
    .get('/random')
    .expect(404)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(expectedOutput)
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });
});