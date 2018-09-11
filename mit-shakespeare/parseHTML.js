const path = require('path');
const fs = require('fs');
const util = require('util');
const sanitizeHtml = require('sanitize-html');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_readFile = util.promisify(fs.readFile);

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
};

// removeHtmlTags('originalWorks', 'modifiedWorks', '1henryiv.html');

module.exports = {
  removeHtmlTags
};
