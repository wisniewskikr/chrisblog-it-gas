function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Get Format of Column A', 'myFunction')    
    .addToUi();
}

function myFunction() {

  var result = "";

  var spreadsheet = SpreadsheetApp.getActive();
  var lastRow = spreadsheet.getLastRow();
  var range = spreadsheet.getRange('A1:A' + lastRow);
  var formats = range.getNumberFormats(); 
  for (var i in formats) {
    for (var j in formats[i]) {
      result = result + formats[i][j] + " | ";
    }
  }

  Browser.msgBox(result);

}