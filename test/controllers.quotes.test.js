const expect = require('chai').expect;
const controllerQuotes = require('../server/controllers/quotes');

describe('Controllers', () => {
  describe('Quotes', () => {
    it('collateTags should transform query string into regexp', () => {
      console.log(controllerQuotes.collateTags('love happiness hatever'));
      const tags1 = 'love';
      const tags2 = 'courage war battle';
      const tags3 = 'FRIENDS roMANS soldiers';

      let actual = controllerQuotes.collateTags(tags1);
      let expected = [/love/i];
      expect(actual).to.deep.equal(expected);
      
      actual = controllerQuotes.collateTags(tags2);
      expected = [/courage/i, /war/i, /battle/i];
      expect(actual).to.deep.equal(expected);

      actual = controllerQuotes.collateTags(tags3);
      expected = [/FRIENDS/i, /roMANS/i, /soldiers/i];
      expect(actual).to.deep.equal(expected);
    });
  });
});