const path = require('path');
const util = require('util');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const { asyncForEach } = require('./asyncHelper');

// case sensitive !!!!!
const fs_writeFile = util.promisify(fs.writeFile);
const fs_readFile = util.promisify(fs.readFile);
const fs_readDir = util.promisify(fs.readdir);

const removeHtmlTags = async (originalDir, modifiedDir, file) => {
  const html = await fs_readFile(`${originalDir}/${file}`, (err, data) => {
    if (err) throw err;
    return data;
  });
  const cleanedHtml = sanitizeHtml(html, {
    allowedTags: ['a'],
    allowedAttributes: {
      a: ['name']
    }
  });
  const newFile = path.resolve(modifiedDir, file);
  await fs_writeFile(newFile, cleanedHtml);
  console.log(`saved ${newFile}`); // eslint-disable-line no-console
};

const removeHtmlTagsAllFiles = async () => {
  const files = await fs_readDir('originalWorks');
  await asyncForEach(files, async work => {
    await removeHtmlTags('originalWorks', 'modifiedWorks', work);
  });
};

const lowerCase = (match, p1) => {
  return ` ${p1.toLowerCase()}`;
};

const cleanText = data => {
  let allLines = data.split(/\r\n|\n/);

  let lines = allLines.filter(line => line.startsWith('<a name') && !line.startsWith('<a name="speech'));
  const blob = lines.join(' ');

  const noEndTag = blob.replace(/<\/a>/gi, '');
  const noLineNum = noEndTag.replace(/\.\d+"/gi, '"');
  const setQuoteEnding = noLineNum.replace(/([^0-9](\.|\?|!) ?)/gi, '$1\n');
  const noClosingATags = setQuoteEnding.replace(/ <a name="\d+\.\d+">(.)/gi, lowerCase);
  const noExtraSpaces = noClosingATags.replace(/ {2,}/gi, '');

  allLines = noExtraSpaces.split(/\r\n|\n/);

  let actScene = '';

  return allLines.map(line => {
    if (line.startsWith('<a name')) {
      actScene = line.match(/<a name="\d+\.\d+">/);
      return line;
    } else {
      return actScene + line;
    }
  });
};

const formatQuotes = async (originalDir, modifiedDir, file) => {
  const newFile = path.resolve(modifiedDir, file);
  const text = await fs_readFile(`${originalDir}/${file}`, 'utf8');
  const quotes = cleanText(text);
  await fs_writeFile(newFile, quotes.join('\n'));
  console.log(`saved ${newFile}`); // eslint-disable-line no-console
};

const formatSonnets = async (originalDir, modifiedDir, file) => {
  const newFile = path.resolve(modifiedDir, file);
  const text = await fs_readFile(`${originalDir}/${file}`, 'utf8');
  await fs_writeFile(newFile, text);
  console.log(`saved ${newFile}`); // eslint-disable-line no-console
};

const formatAllFiles = async () => {
  const files = await fs_readDir('modifiedWorks');
  await asyncForEach(files, async work => {
    if (work.startsWith('sonnet') || work.startsWith('Venus')) {
      await formatSonnets('modifiedWorks', 'finalWorks', work);
    } else {
      await formatQuotes('modifiedWorks', 'finalWorks', work);
    }
  });
};

// removeHtmlTagsAllFiles();
// formatAllFiles();

module.exports = {
  removeHtmlTags,
  removeHtmlTagsAllFiles,
  formatAllFiles
};
