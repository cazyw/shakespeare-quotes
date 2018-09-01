/*
 * Shakespeare Quote App
 * Testing mit-shakespeare files
*/

const expect = require('chai').expect;
const { getShakespeareWorksLinks, processLink, puppeteerSetup, puppeteerTeardown } = require('../mit-shakespeare/retrieve-works');

describe('MIT Shakespeare', () => {
  context('retrieving works from MIT shakespeare website', () => {
    it('should get a list of 42 works', async function() {
      const expectedNumberOfWorks = 42;
      let { browser, page } = await puppeteerSetup();
      const listOfWorks = await getShakespeareWorksLinks(page);
      await puppeteerTeardown(browser);

      expect(listOfWorks.length).to.eq(expectedNumberOfWorks);
    });
  });

  context('processing urls', () => {
    it('should correctly identify and process poetry', () => {
      let url = 'http://shakespeare.mit.edu/Poetry/VenusAndAdonis.html';
      let { workName, fullUrl } = processLink(url);
      expect(workName).to.eq('VenusAndAdonis');
      expect(fullUrl).to.eq('http://shakespeare.mit.edu/Poetry/VenusAndAdonis.html');
      url = 'http://shakespeare.mit.edu/Poetry/RapeOfLucrece.html';

      ({ workName, fullUrl } = processLink(url));
      expect(workName).to.eq('RapeOfLucrece');
      expect(fullUrl).to.eq('http://shakespeare.mit.edu/Poetry/RapeOfLucrece.html');
    });

    it('should correctly identify and process plays', () => {
      let url = 'http://shakespeare.mit.edu/allswell/index.html';
      let { workName, fullUrl } = processLink(url);
      expect(workName).to.eq('allswell');
      expect(fullUrl).to.eq('http://shakespeare.mit.edu/allswell/full.html');

      url = 'http://shakespeare.mit.edu/1henryvi/index.html';
      ({ workName, fullUrl } = processLink(url));
      expect(workName).to.eq('1henryvi');
      expect(fullUrl).to.eq('http://shakespeare.mit.edu/1henryvi/full.html');

      url = 'http://shakespeare.mit.edu/twelfth_night/index.html';
      ({ workName, fullUrl } = processLink(url));
      expect(workName).to.eq('twelfth_night');
      expect(fullUrl).to.eq('http://shakespeare.mit.edu/twelfth_night/full.html');
    });

    it('should correctly identify and process non-works', () => {
      let url = 'http://shakespeare.mit.edu/index.html';
      let { workName, fullUrl } = processLink(url);
      expect(workName).to.eq(null);
      expect(fullUrl).to.eq(null);
    });
  });
});
