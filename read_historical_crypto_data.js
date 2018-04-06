var _ = require('lodash');
var fs = require('fs');

var initiate = "This file reads crypto historical data";
console.log(initiate);

var csv_file_content;

var bitcoin_data = fs.readFile('bitcoin_dataset.csv', 'utf8', function read_csv_file(err , data){
    if(err){
      throw err;
    }

    csv_file_content = data;
    process_csv_file(csv_file_content);
});

function process_csv_file(csv_file_content){
  console.log("Processing the csv file that is read in now");

  //Split content by new line and generate header as object keys
  var lines = csv_file_content.split("\n");

  var header = lines.splice(0,1);

  var column_names = header[0].split(",");

  var csv_data_object = {};

  for (var i = 0; i< column_names.length; i++) {
    csv_data_object[ column_names[i] ] = []
  }

  _.forEach(lines, function(line) {
    var cellData = line.split(",");
    _.forEach(cellData, function(cell, idx) {
      var col = column_names[idx];
      csv_data_object[col].push(cell);
    });
  });

return csv_data_object;

}
