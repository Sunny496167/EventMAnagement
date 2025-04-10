// utils/fileUtils.js
const fs = require('fs');
const path = require('path');

module.exports.createUploadsFolder = (uploadPath) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};