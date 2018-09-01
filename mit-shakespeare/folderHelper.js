const fs = require('fs');
const originalDir = './originalWorks';
const modifiedDir = './modifiedWorks';

// folders for original and modified works
const createOriginalFolder = () => {
  if (!fs.existsSync(originalDir)){
    fs.mkdirSync(originalDir);
  }
};

const createModifiedFolder = () => {
  if (!fs.existsSync(modifiedDir)){
    fs.mkdirSync(modifiedDir);
  }
};

module.exports = {
  createOriginalFolder,
  createModifiedFolder
};