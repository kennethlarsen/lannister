const fs = require('fs');

function report() {
  this.initialReport = () => {
    const date = new Date();

    if (fs.existsSync('report.md')) {
      fs.appendFileSync('report.md', `#${date}\n`, 'UTF-8', { flags: 'a+' });
    } else {
      fs.writeFile('report.md', `#${date}\n`, (err) => {
        if (err) throw err;
      });
    }
  };

  this.writeToReport = (text) => {
    fs.appendFileSync('report.md', `${text}\n`, 'UTF-8', { flags: 'a+' });
  };
}

module.exports = report;
