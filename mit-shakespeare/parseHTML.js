const fs = require('fs');
const util = require('util');
const sanitizeHtml = require('sanitize-html');
const fs_writeFile = util.promisify(fs.writeFile);
// const originalDir = './originalWorks';
// const modifiedDir = './modifiedWorks';

const removeHtmlTags = (originalDir, modifiedDir, file) => {
  fs.readFile(`./${originalDir}/${file}`, (err, data) => {
    if (err) throw err;
    const cleanHtml = sanitizeHtml(data, {
      allowedTags: [],
      allowedAttributes: []
    });
    fs_writeFile(`./${modifiedDir}/${file}`, cleanHtml);
  });
};

removeHtmlTags('originalWorks', 'modifiedWorks', '1henryiv.html');


