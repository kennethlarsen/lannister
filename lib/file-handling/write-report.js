const fs = require('fs');

function report() {
  /**
   * Checks if report file exists. If not then we create it.
   * After check and creation we generate a headline with current date.
   */
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

  /**
   * Appends text to the existing report.
   * @param {string} text
   */
  this.writeToReport = (text) => {
    fs.appendFileSync('report.md', `${text}\n`, 'UTF-8', { flags: 'a+' });
  };
}

module.exports = report;
