function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Hide Row 1', 'hideRow') 
    .addItem('Show Row 1', 'showRow')
    .addToUi();

   writeInCell(); 
}

function hideRow() {

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.hideRows(1);

}

function showRow() {

  var spreadsheet = SpreadsheetApp.getActive();  
  var sheet = spreadsheet.getActiveSheet();
  sheet.showRows(1);

}