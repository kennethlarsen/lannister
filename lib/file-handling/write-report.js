const fs = require('fs');

function report() {
  /**
   * Checks if report file exists. If not then we create it.
   * After check and creation we generate a headline with current date.
   * @param {string} pathToReport
   */
  this.initialReport = (pathToReport) => {
    const date = new Date();
    if (fs.existsSync(pathToReport)) {
      fs.appendFileSync(pathToReport, `#${date}\n`, 'UTF-8', { flags: 'a+' });
    } else {
      fs.writeFile(pathToReport, `#${date}\n`, (err) => {
        if (err) throw err;
      });
    }
  };

  /**
   * Appends text to the existing report.
   * @param {string} text
   * @param {string} pathToReport
   */
  this.writeToReport = (text, pathToReport) => {
    fs.appendFileSync(pathToReport, `${text}\n`, 'UTF-8', { flags: 'a+' });
  };
}

module.exports = report;
