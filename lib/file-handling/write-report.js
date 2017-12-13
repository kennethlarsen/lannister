var fs = require('fs');

function report() {
  this.writeToReport = (text) => {
    if (fs.existsSync("report.md")) {
      fs.appendFileSync("report.md", `${text}\n`, "UTF-8",{'flags': 'a+'});
    } else {
      fs.writeFile("report.md", `${text}\n`, (err) => {
        if (err) throw err;
      })
    }
  }
}

module.exports = report;
