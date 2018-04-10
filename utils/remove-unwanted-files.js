const fileExtension = require('file-extension');

function removeUnwantedFiles(fileList) {
  const cleanFiles = [];
  fileList.forEach((file) => {
    if (fileExtension(file) === 'js') {
      cleanFiles.push(file);
    }
  });
  return cleanFiles;
}

module.exports = removeUnwantedFiles;
