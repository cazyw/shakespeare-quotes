const { tweetUrl } = require('../client/src/utils/helperFunctions');
const expect = require('chai').expect;

describe('Tweeting Quotes', () => {
  it('should correctly encode data to be sent in the twitter web intent', () => {
    const data = {
      quote: 'to be or not to be; that is the question: isn\'t it?',
      work: 'Hamlet',
      act: '3',
      scene:'1',
    };
    // eslint-disable-next-line quotes
    const encodedData = `%22to%20be%20or%20not%20to%20be%3B%20that%20is%20the%20question%3A%20isn't%20it%3F%22%20-%20Hamlet%20(Act%203%2C%20Sc%201)`;
    const expectedOutput = `https://twitter.com/intent/tweet?text=${encodedData}&hashtags=ShakespeareSunday`;
    const encodedUrl = tweetUrl(data.quote, data.work, data.act, data.scene);
    expect(encodedUrl).to.eq(expectedOutput);
  });
});
