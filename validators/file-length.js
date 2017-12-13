const fs = require('fs');

function lineCheck() {
  this.checkLenghtOfFile = (file) => {
    let i;
    let count = 0;
    fs.createReadStream(file)
      .on('data', function (chunk) {
        for (i=0; i < chunk.length; ++i)
          if (chunk[i] == 10) count++;
      })
      .on('end', function() {
        if (count > 250) {
          process.stdout.write(`${file}: ${count}`);        
        }
    });
  };
}

module.exports = lineCheck;
