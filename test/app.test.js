
/*
 * Shakespeare Quote App
 * Testing app.js
 */

const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../server/app');

const quote = {
  work: "The Taming of the Shrew",
  act: "1",
  scene: "2",
  quote: "O this learning, what a thing it is!",
  tags: ["learning", "education", "teaching"]
}

const warningOutput = { warning: "there's nothing here" };

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
    request(app)
    .get('/api')
    .expect(404)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(warningOutput)
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });

  it('should return status 404 on /random', (done) => {
    request(app)
    .get('/random')
    .expect(404)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(warningOutput)
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    })
  });
});

describe('POST /<incorrect route>', () => {
  it('should return status 404 on /', (done) => {
    request(app)
    .post('/')
    .send(quote)
    .expect(404)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(warningOutput)
    })
    .end((err) => {
      if(err) return done(err);
      done();
    })
  });

  it('should return status 404 on /api', (done) => {
    request(app)
    .post('/api')
    .send(quote)
    .expect(404)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(warningOutput)
    })
    .end((err) => {
      if(err) return done(err);
      done();
    })
  });

  it('should return status 404 on /random', (done) => {
    request(app)
    .post('/random')
    .send(quote)
    .expect(404)
    .expect((res) => {
      expect(res.body).to.be.an('object').to.deep.include(warningOutput)
    })
    .end((err) => {
      if(err) return done(err);
      done();
    })
  });
});