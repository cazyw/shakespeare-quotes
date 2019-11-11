const pupeteer = require('puppeteer');

const puppeteerSetup = async () => {
  const browser = await pupeteer.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH,
    args: ['--no-sandbox'] // This was important. Can't remember why
  });
  const page = await browser.newPage();
  return { browser, page };
};

const puppeteerTeardown = async browser => {
  await browser.close();
};

module.exports = {
  puppeteerSetup,
  puppeteerTeardown
};
