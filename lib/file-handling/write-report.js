var fs = require('fs');

function report() {
  this.writeToReport = (text) => {
    fs.appendFileSync("report.md", `${text}\n`, "UTF-8",{'flags': 'a+'});
  }
}

module.exports = report;
