const Report = require('../file-handling/write-report');

const report = new Report();

function paramsLength() {
  this.checkParams = (line, file, pathToReport) => {
    if (line.includes('function') || line.includes('=>')) {
      const regExp = /\(([^)]+)\)/;
      const params = regExp.exec(line);

      if (!params) {
        return false;
      }

      const paramsArray = params[1].split(',');

      if (paramsArray.length > 4) {
        report.writeToReport(`- [ ] Error in ${file}: ${line} (too-many-args)`, pathToReport);
      }
    }
  };
}

module.exports = paramsLength;
