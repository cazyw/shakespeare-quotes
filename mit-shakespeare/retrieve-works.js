
const pupeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);
const { asyncForEach } = require('./asyncHelper');
const { createOriginalFolder, createModifiedFolder } = require('./folderHelper');
const originalDir = './originalWorks';
// const modifiedDir = './modifiedWorks';

let browser;
let page;

const puppeteerSetup = async () => {
  browser = await pupeteer.launch({headless: false});
  page = await browser.newPage();
};

const puppeteerTeardown = async () => {
  await browser.close();
};

// get list of links for shakespeare's works from http://shakespeare.mit.edu/
const getShakespeareWorksLinks = async () => {
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
  const workName = isPoetry ? url.match(regexPoetry)[1] : url.match(regexPlay)[1];
  const fullUrl = url.replace('index.html', 'full.html');
  console.log('work: ', workName, ' == ', fullUrl);
  return { workName, fullUrl };
};

// download the full text of a piece of work
const downloadAPage = async (work, url) => {
  await page.goto(url);
  await page.waitFor(5000);
  const html = await page.content();
  const filename = `${originalDir}/${work}.html`;
  await fs_writeFile(filename, html);
  console.log(`Saved ${filename}!`);
};

const downloadSonnets = async (sonnetUrl) => {
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

downloadSonnets('http://shakespeare.mit.edu/Poetry/sonnets.html');

// get the full list of works and download them all
// there are 42 plays and 154 sonnets
const downloadAllPages = async () => {
  await puppeteerSetup();
  const listOfWorks = await getShakespeareWorksLinks();
  createOriginalFolder();
  await asyncForEach(listOfWorks, async (work) => {
    const { workName, fullUrl } = processLink(work);
    await downloadAPage(workName, fullUrl);
    if (workName === 'sonnets') downloadSonnets(fullUrl);
  });
  await puppeteerTeardown(browser);
};

// downloadAllPages();

module.exports = {
  getShakespeareWorksLinks
};

