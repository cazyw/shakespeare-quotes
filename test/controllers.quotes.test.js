const expect = require('chai').expect;
const controllerQuotes = require('../server/controllers/quotes');

describe('Controllers', () => {
  describe('Quotes', () => {
    it('collateTags should transform query string into regexp', () => {
      const tags1 = 'love';
      const tags2 = 'courage war battle';
      const tags3 = 'FRIENDS roMANS soldiers';

      let actual = controllerQuotes.collateTags(tags1);
      let expected = [/loves/i, /love/i];
      expect(actual).to.deep.equal(expected);
      
      actual = controllerQuotes.collateTags(tags2);
      expected = [/courages/i, /courage/i, /wars/i, /war/i, /battles/i, /battle/i];
      expect(actual).to.deep.equal(expected);

      actual = controllerQuotes.collateTags(tags3);
      expected = [/friends/i, /friend/i, /romans/i, /roman/i, /soldiers/i, /soldier/i];
      expect(actual).to.deep.equal(expected);
    });
  });
});