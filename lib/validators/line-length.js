const Report = require('../file-handling/write-report');

const report = new Report();

function lineLengthCheck() {
  this.checkMaxLength = (line, file, pathToReport, lineNumber) => {
    if (line.length > 100) {
      report.writeToReport(`- [ ] ${file} has a long code line on line ${lineNumber}. Consider refactor. (line-length)`, pathToReport);
    }
  };
}

module.exports = lineLengthCheck;
