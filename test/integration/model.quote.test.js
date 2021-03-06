/*
 * Shakespeare Quote App
 * Testing quotes model
 * Does not require a connection to any database
 * To run this test only
 * $ ./node_modules/mocha/bin/mocha test/model.quote.test.js
 */
'use strict';

const expect = require('chai').expect;
const mongoose = require('mongoose');
const { Quote } = require('../../models/quote');
const config = require('../../config').get('test');

// connect to mongodb
const options = { connectTimeoutMS: 30000, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

describe('Quote Schema', () => {
  before(done => {
    if (!mongoose.connection.readyState) {
      mongoose.models = {};
      mongoose.modelSchemas = {};
      mongoose.connect(config.database, options);
    } else {
      // console.log('Error: mongodb has not been started. Run mongod --dbpath ~/data/db');
      mongoose.models = {};
      mongoose.modelSchemas = {};
      done();
    }
  });

  after(done => {
    if (mongoose.connection.db) {
      mongoose.connection.db.dropDatabase().then(() => {
        mongoose.connection.close();
        done();
      });
    } else {
      done();
    }
  });

  it('should be invalid if "work" is missing', done => {
    let quote = new Quote({
      act: '4',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.work).to.exist;
      done();
    });
  });

  it('should be invalid if "work" is blank', done => {
    let quote = new Quote({
      work: '',
      act: '4',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.work).to.exist;
      done();
    });
  });

  it('should be invalid if "act" is missing', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.act).to.exist;
      done();
    });
  });

  it('should be invalid if "act" is blank and "scene" is not', done => {
    let quote = new Quote({
      work: 'Henry V',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.act).to.exist;
      done();
    });
  });

  it('should be invalid if "act" is not a numerical value', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: 'IV',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.act).to.exist;
      done();
    });
  });

  it('should be invalid if "scene" is missing', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.scene).to.exist;
      done();
    });
  });

  it('should be invalid if "scene" is blank and "act" is not', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: '',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.scene).to.exist;
      done();
    });
  });

  it('should be invalid if "scene" is not a numerical value', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: 'three',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.scene).to.exist;
      done();
    });
  });

  it('should be invalid if "quote" is missing', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: '1',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.quote).to.exist;
      done();
    });
  });

  it('should be invalid if "quote" is blank', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: '1',
      quote: '',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err.errors.quote).to.exist;
      done();
    });
  });

  it('should be invalid if "tags" is missing', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...'
    });

    quote.validate(err => {
      expect(err.errors.tags).to.exist;
      done();
    });
  });

  it('should be invalid if "tags" array is empty', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '4',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: []
    });

    quote.validate(err => {
      expect(err.errors.tags).to.exist;
      done();
    });
  });

  it('should be valid if all fields are completed', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '2',
      scene: '1',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should be valid if all fields are completed (both act and scene blank)', done => {
    let quote = new Quote({
      work: 'Henry V',
      act: '',
      scene: '',
      quote: 'I am afeard there are few die well that die in a battle...',
      tags: ['death', 'battle', 'war']
    });

    quote.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
