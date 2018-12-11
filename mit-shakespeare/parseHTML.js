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

const extractLines = async (modifiedDir, file) => {
  const work = await fs_readFile(`${modifiedDir}/${file}`, { encoding: 'utf8' }, async (err, data) => {
    if (err) throw err;
    // console.log('data', data);
    const allLines = data.split(/\r\n|\n/);
    // Reading line by line
    const speech = allLines.filter(line => line.startsWith('<a name'));
    const a = speech.map(line => line.replace('</a>', ''));
    const newFile = path.resolve(modifiedDir, '_test.html');
    await fs_writeFile(newFile, a[0]);
    console.log(`saved ${newFile}`); // eslint-disable-line no-console
    return data;
  });
  return work;
};

// removeHtmlTagsAllFiles();

extractLines('modifiedWorks', '1henryiv.html');

module.exports = {
  removeHtmlTags
};
