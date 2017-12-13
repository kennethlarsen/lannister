var fs = require('fs');

function report() {
  this.generateReport = () => {
    fs.writeFile("report.md", "Hey there!", function(err) {
      if(err) {
          return process.stdout.write(err);
      }
      process.stdout.write("\n Generated report!");
    }); 
  }
}

module.exports = report;
