const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);
const { asyncForEach } = require('./asyncHelper');
const { createFolder } = require('./folderHelper');
const { puppeteerSetup, puppeteerTeardown } = require('./puppeteerHelper');
const originalDir = './originalWorks';

// due to this issue https://github.com/GoogleChrome/puppeteer/issues/1054,
// the istanbul (coverage reporter) will cause error inside page.evaluate throwing exception.
// the inserted "ignore" comment allows istanbul to succeed

// get list of links on a given page (main works or sonnets)
const getLinksToWorks = async (page, url, workType) => {
  await page.goto(url);
  await page.waitFor(1000);
  const result = await page.evaluate(
    /* istanbul ignore next */ (url, workType) => {
      const works = [];
      let links = document.querySelectorAll('a');
      let isAWork = false;
      for (let i = 0; i < links.length; i++) {
        if (workType === 'sonnets') {
          isAWork = links[i].href.includes('sonnet');
        } else if (workType === 'works') {
          isAWork = links[i].href.includes('allswell') || links[i].href.includes('python') ? !isAWork : isAWork;
        }
        if (isAWork) works.push(links[i].href);
      }
      return works;
    },
    url,
    workType
  );
  return result;
};

// get the work's name and url to full text
const processLink = url => {
  const regexPlay = /edu\/(.+)\//i;
  const regexPoetry = /edu\/Poetry\/(.+)\.html/i;
  const isPoetry = url.match(regexPoetry);
  const isPlay = url.match(regexPlay);
  const workName = isPoetry ? isPoetry[1] : isPlay ? isPlay[1] : null;
  const fullUrl = url.replace('index.html', 'full.html');
  return { workName, fullUrl };
};

// download the full text of a piece of work
const downloadAPage = async (page, work, url) => {
  await page.goto(url);
  await page.waitFor(5000);
  const html = await page.content();
  const filename = `${originalDir}/${work}.html`;
  await fs_writeFile(filename, html);
  console.log(`Saved ${filename}!`); // eslint-disable-line no-console
};

// get the full list of works and download them all
// there are 42 plays and 154 sonnets
const downloadAllPages = async () => {
  const mainUrl = 'http://shakespeare.mit.edu/';
  const sonnetsUrl = 'http://shakespeare.mit.edu/Poetry/sonnets.html';
  createFolder(originalDir);

  const { browser, page } = await puppeteerSetup();

  const listOfWorks = await getLinksToWorks(page, mainUrl, 'works');
  const listOfSonnets = await getLinksToWorks(page, sonnetsUrl, 'sonnets');
  const fullList = listOfWorks.concat(listOfSonnets);

  await asyncForEach(fullList, async work => {
    const { workName, fullUrl } = processLink(work);
    await downloadAPage(page, workName, fullUrl);
  });

  await puppeteerTeardown(browser);
};

// downloadAllPages();

module.exports = {
  getLinksToWorks,
  processLink,
  downloadAllPages
};
