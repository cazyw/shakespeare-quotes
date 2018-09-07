const pupeteer = require('puppeteer');

const puppeteerSetup = async () => {
  const browser = await pupeteer.launch({headless: false});
  const page = await browser.newPage();
  return { browser, page };
};

const puppeteerTeardown = async (browser) => {
  await browser.close();
};


module.exports = {
  puppeteerSetup,
  puppeteerTeardown
};