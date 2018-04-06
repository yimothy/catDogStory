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
    var parsed_csv_file_content = process_csv_file(csv_file_content);
    write_json_from_csv('bitcoin_dataset.JSON' , parsed_csv_file_content )
});

function process_csv_file(csv_file_content){
  console.log("Processing the csv file that is read in now");

  //Split content by new line and generate header as object keys
  var lines = csv_file_content.split("\n");

  var header = lines.splice(0,1);

  var column_names = header[0].split(",");

  var csv_data_object = {};

//Column names array
  for (var i = 1; i< column_names.length; i++) {
    csv_data_object[ column_names[i] ] = []
  }

  //Each line
  _.forEach(lines, function(line , line_idx) {
      var cellData = line.split(",");

      //Each cell per line
      _.forEach(cellData, function(cell, cell_idx) {
        if(cell_idx === 0) {
          return;
        }

        var cellObject = {}

        cellObject.date = cellData[0]
        cellObject.value = cell

        var col = column_names[cell_idx];
        csv_data_object[col].push(cellObject);
      });
    });

    return csv_data_object;
}

//Write json
function write_json_from_csv( file_name , input_data ) {
  console.log('Writing the json object from the parsed csv file');
  fs.writeFileSync( file_name , JSON.stringify(input_data) );
}
