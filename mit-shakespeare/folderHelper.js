const fs = require('fs');

// folders for original and modified works
const createFolder = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

module.exports = {
  createFolder
};
