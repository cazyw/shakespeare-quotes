const expect = require('chai').expect;
const controllerQuotes = require('../../server/controllers/quotes');

describe('Controllers', () => {
  describe('Quotes', () => {
    it('collateTags should transform query string into regexp and include singular/plural', () => {
      const tags1 = 'love';
      const tags2 = 'courage war battle';
      const tags3 = 'FRIENDS roMANS soldiers';

      let actual = controllerQuotes.collateTags(tags1);
      let expected = [/^loves|.*[^\w]loves/i, /^love|.*[^\w]love/i];
      expect(actual).to.deep.equal(expected);

      actual = controllerQuotes.collateTags(tags2);
      expected = [
        /^courages|.*[^\w]courages/i,
        /^courage|.*[^\w]courage/i,
        /^wars|.*[^\w]wars/i,
        /^war|.*[^\w]war/i,
        /^battles|.*[^\w]battles/i,
        /^battle|.*[^\w]battle/i
      ];
      expect(actual).to.deep.equal(expected);

      actual = controllerQuotes.collateTags(tags3);
      expected = [
        /^friends|.*[^\w]friends/i,
        /^friend|.*[^\w]friend/i,
        /^romans|.*[^\w]romans/i,
        /^roman|.*[^\w]roman/i,
        /^soldiers|.*[^\w]soldiers/i,
        /^soldier|.*[^\w]soldier/i
      ];
      expect(actual).to.deep.equal(expected);
    });
  });
});
