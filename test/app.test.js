/*
 * Shakespeare Quote App
 * Testing App.js
 */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/app');

describe ('GET /', () => {
  it('should return a 200 response', (done) => {
    request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });

  it('should render html', (done) => {
    request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .expect(/DOCTYPE html/)
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });
});