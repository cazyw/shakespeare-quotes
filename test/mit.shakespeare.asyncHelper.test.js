const expect = require('chai').expect;
const { asyncForEach } = require('../mit-shakespeare/asyncHelper');

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Async for loop helper', () => {
  it('should loop through an array asynchronously', async () => {
    const arr = [0, 1, 2, 3, 4, 5];
    const newArr = [];
    await asyncForEach(arr, async (item) => {
      await wait(500).then(() => {
        newArr.push(item);
      });
    });
    expect(newArr).to.eql(arr);
  });
});