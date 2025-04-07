function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Read "Hello World" from cell A1', 'readFromCell')          
    .addToUi();
}

function readFromCell() {
  var spreadsheet = SpreadsheetApp.getActive();
  var value = spreadsheet.getRange('A1').getValue();
  Logger.log("Value of cell A1: " + value);
  SpreadsheetApp.getUi().alert("Value of cell A1: " + value);
};