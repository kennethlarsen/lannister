const colors = require('colors/safe');
const Report = require('../file-handling/write-report');
const report = new Report();

function paramsLenght() {
  this.checkParams = (line, file) => {
    if (line.includes('function')) {
      const regExp = /\(([^)]+)\)/;
      const params = regExp.exec(line);
      const paramsArray = params[1].split(',');

      if (paramsArray.length > 4) {
        report.writeToReport(`- [ ] Error in ${file}: ${line} (too-many-args)`);
      }
    }
  };
}

module.exports = paramsLenght;
