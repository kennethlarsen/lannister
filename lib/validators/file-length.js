const fs = require('fs');
const Report = require('../file-handling/write-report');
const report = new Report();

function lineCheck() {
  this.checkLenghtOfFile = (file) => {
    let i;
    let count = 0;
    fs.createReadStream(file)
      .on('data', (chunk) => {
        for (i = 0; i < chunk.length; i += 1) {
          if (chunk[i] === 10) count += 1;
        }
      })
      .on('end', () => {
        if (count > 250) {
          report.writeToReport(`- [ ] ${file} is more then 250 lines. Consider refactor. (too-long)`);          
        }
      });
  };
}

module.exports = lineCheck;
