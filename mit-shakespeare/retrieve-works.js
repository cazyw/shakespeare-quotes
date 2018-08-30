const pupeteer = require('puppeteer');
const fs = require('fs');
const originalDir = './originalWorks';
// const modifiedDir = './modifiedWorks';

// folders for original and modified works
if (!fs.existsSync(originalDir)){
  fs.mkdirSync(originalDir);
}

// if (!fs.existsSync(modifiedDir)){
//   fs.mkdirSync(modifiedDir);
// }

let puppeteerSetup = async () => {
  const browser = await pupeteer.launch({headless: false});
  const page = await browser.newPage();
  return {
    browser,
    page
  };
};

let puppeteerTeardown = async (browser) => {
  await browser.close();
};

// retrieve links for shakespeare's works from http://shakespeare.mit.edu/
let shakespeareWorksLinks = async () => {
  const { browser, page } = await puppeteerSetup();
  await page.goto('http://shakespeare.mit.edu/', { waitUntil: 'networkidle2' });
  // await page.waitFor(1000);

  const result = await page.evaluate(() => {
    const works = [];
    let links = document.querySelectorAll('a');
    let isAWork = false;
    for(let i = 2; i < links.length; i++) {
      isAWork = links[i].href.includes('allswell') || links[i].href.includes('python') ? !isAWork : isAWork ;
      if(isAWork){
        works.push(links[i].href);
      }
    }
    return works;
  });

  await puppeteerTeardown(browser);
  return result;
};

let downloadPage = async (url) => {
  const { browser, page } = await puppeteerSetup();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const html = await page.content();
  const filename = `${originalDir}/allswell.html`;
  fs.writeFileSync(filename, html, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  await puppeteerTeardown(browser);
  return html;
};

// downloadPage('http://shakespeare.mit.edu/allswell/full.html').then((output) => {
//   console.log(output);
// });


// shakespeareWorksLinks().then((output) => {
//   /* eslint-disable no-console */
//   console.log(output);
// });

module.exports = {
  shakespeareWorksLinks
};

