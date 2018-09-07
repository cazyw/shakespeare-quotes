/*
 * Shakespeare Quote App
 * Testing mit-shakespeare files
*/

const expect = require('chai').expect;
const { getLinksToWorks, processLink } = require('../mit-shakespeare/retrieveWorks');
const { puppeteerSetup, puppeteerTeardown } = require('../mit-shakespeare/puppeteerHelper');

describe.only('MIT Shakespeare', () => {
  context('retrieving works from MIT shakespeare website', () => {
    it('should get a list of 42 plays/poetry and 154 sonnets', async function() {
      const expectedNumberOfWorks = 42;
      const expectedNumberOfSonnets = 154;
      const mainUrl = 'http://shakespeare.mit.edu/';
      const sonnetsUrl = 'http://shakespeare.mit.edu/Poetry/sonnets.html';
      let { browser, page } = await puppeteerSetup();
      const listOfWorks = await getLinksToWorks(page, mainUrl, 'works');
      const listOfSonnets = await getLinksToWorks(page, sonnetsUrl, 'sonnets');
      await puppeteerTeardown(browser);

      expect(listOfWorks.length).to.eq(expectedNumberOfWorks);
      expect(listOfSonnets.length).to.eq(expectedNumberOfSonnets);
    });
  });

  context('processing urls', () => {
    it('should correctly identify and process poetry', () => {
      let url = 'http://shakespeare.mit.edu/Poetry/VenusAndAdonis.html';
      let { workName, fullUrl } = processLink(url);
      expect(workName).to.eq('VenusAndAdonis');
      expect(fullUrl).to.eq(url);

      url = 'http://shakespeare.mit.edu/Poetry/RapeOfLucrece.html';
      ({ workName, fullUrl } = processLink(url));
      expect(workName).to.eq('RapeOfLucrece');
      expect(fullUrl).to.eq(url);
    });

    it('should correctly identify and process sonnets', () => {
      let url = 'http://shakespeare.mit.edu/Poetry/sonnet.XXXIX.html';
      let { workName, fullUrl } = processLink(url);
      expect(workName).to.eq('sonnet.XXXIX');
      expect(fullUrl).to.eq(url);
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
      expect(fullUrl).to.not.eq(null);
    });

  });
});
