const Report = require('../file-handling/write-report');

const report = new Report();

function lineLengthCheck() {
  this.checkMaxLength = (line, file, pathToReport) => {
    if (line.length > 80) {
      report.writeToReport(`- [ ] ${file} has a long code line. Consider refactor. (line-length)`, pathToReport);
    }
  };
}

module.exports = lineLengthCheck;
