
const pupeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);
const { asyncForEach } = require('./asyncHelper');
const { createOriginalFolder } = require('./folderHelper');
const originalDir = './originalWorks';
// const modifiedDir = './modifiedWorks';

const puppeteerSetup = async () => {
  const browser = await pupeteer.launch({headless: false});
  const page = await browser.newPage();
  return { browser, page };
};

const puppeteerTeardown = async (browser) => {
  await browser.close();
};

// get list of links for shakespeare's works from http://shakespeare.mit.edu/
const getShakespeareWorksLinks = async (page) => {
  await page.goto('http://shakespeare.mit.edu/');
  await page.waitFor(1000);
  const result = await page.evaluate(() => {
    const works = [];
    let links = document.querySelectorAll('a');
    let isAWork = false;
    for(let i = 2; i < links.length; i++) {
      isAWork = links[i].href.includes('allswell') || links[i].href.includes('python') ? !isAWork : isAWork ;
      if(isAWork) works.push(links[i].href);
    }
    return works;
  });
  return result;
};

// get the work's name and url to full text
const processLink = (url) => {
  var regexPlay = /edu\/(.+)\//i;
  var regexPoetry = /edu\/Poetry\/(.+)\.html/i;
  const isPoetry = url.match(regexPoetry);
  const isPlay = url.match(regexPlay);
  const workName = isPoetry ? url.match(regexPoetry)[1] : isPlay ? url.match(regexPlay)[1] : null;
  const fullUrl = url.replace('index.html', 'full.html');
  console.log('work: ', workName, ' == ', fullUrl);
  return { workName, fullUrl };
};

// download the full text of a piece of work
const downloadAPage = async (page, work, url) => {
  await page.goto(url);
  await page.waitFor(5000);
  const html = await page.content();
  const filename = `${originalDir}/${work}.html`;
  await fs_writeFile(filename, html);
  console.log(`Saved ${filename}!`);
};

const downloadSonnets = async (page, sonnetUrl) => {
  await puppeteerSetup();
  console.log('Retrieving sonnets');
  await page.goto(sonnetUrl);
  await page.waitFor(5000);
  const sonnets = await page.evaluate(() => {
    const works = [];
    let links = document.querySelectorAll('a');
    let isAWork = false;
    for(let i = 0; i < links.length; i++) {
      isAWork = links[i].href.includes('sonnet');
      if(isAWork) works.push(links[i].href);
    }
    return works;
  });
  console.log('Downloading sonnets');
  await asyncForEach(sonnets, async (sonnet) => {
    const { workName, fullUrl } = processLink(sonnet);
    await downloadAPage(workName, fullUrl);
  });
  await puppeteerTeardown(browser);
};

// downloadSonnets('http://shakespeare.mit.edu/Poetry/sonnets.html');

// get the full list of works and download them all
// there are 42 plays and 154 sonnets
const downloadAllPages = async () => {
  const {browser, page } = await puppeteerSetup();
  const listOfWorks = await getShakespeareWorksLinks(page);
  createOriginalFolder();
  await asyncForEach(listOfWorks, async (work) => {
    const { workName, fullUrl } = processLink(work);
    await downloadAPage(page, workName, fullUrl);
    if (workName === 'sonnets') downloadSonnets(fullUrl);
  });
  await puppeteerTeardown(browser);
};

// downloadAllPages();

module.exports = {
  getShakespeareWorksLinks,
  puppeteerSetup,
  puppeteerTeardown,
  processLink
};

