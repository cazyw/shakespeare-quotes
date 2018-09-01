/*
 * Shakespeare Quote App
 * Testing mit-shakespeare files
*/

const expect = require('chai').expect;
const { getShakespeareWorksLinks } = require('../mit-shakespeare/retrieve-works');

describe('MIT Shakespeare', () => {
  context('retrieving works from MIT shakespeare website', () => {

    it('should get a list of 42 works', async function() {
      const expectedNumberOfWorks = 42;
      const works = await getShakespeareWorksLinks();
      expect(works.length).to.eq(expectedNumberOfWorks);
    });

  });
});
