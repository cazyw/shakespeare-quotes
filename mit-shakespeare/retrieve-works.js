const fs = require('fs');
const originalDir = './originalWorks';
const modifiedDir = './modifiedWorks';

if (!fs.existsSync(originalDir)){
  fs.mkdirSync(originalDir);
}

if (!fs.existsSync(modifiedDir)){
  fs.mkdirSync(modifiedDir);
}