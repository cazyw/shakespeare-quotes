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
    allowedTags: [],
    allowedAttributes: []
  });
  const newFile = path.resolve(modifiedDir, file);
  await fs_writeFile(newFile, cleanedHtml);
  console.log(`saved ${newFile}`); // eslint-disable-line no-console
};

const removeHtmlTagsAllFiles = async () => {
  const files = await fs_readDir('originalWorks');
  await asyncForEach(files, async (work) => {
    await removeHtmlTags('originalWorks', 'modifiedWorks', work);
  });
};

// removeHtmlTagsAllFiles();

module.exports = {
  removeHtmlTags
};
