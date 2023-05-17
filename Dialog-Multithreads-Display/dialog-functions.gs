var threadsCount = 1;
var rowsCount = 10;
var header = [["Header 1", "Header 2", "Header 3", "Header 4", "Header 5", "Header 6", "Header 7", "Header 8", "Header 9", "Header 10"]];
var row = ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5", "Value 6", "Value 7", "Value 8", "Value 9", "Value 10"];

function onInit() {

  clearGsheet();
  displayHeader();
  adjustRowsCount(threadsCount * rowsCount);

  var data = {
    "threadsCount" : threadsCount
  }

  return JSON.stringify(data);
   
}

function displayData(index) {
  
  var values = getValues();
  var startIndex = ((index - 1) * values.length) + 2;

  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ss.getRange(startIndex, 1, values.length, header[0].length).setValues(values);

}

function clearGsheet() {

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.clear();

}

function displayHeader() {

  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ss.getRange(1, 1, 1, header[0].length).setValues(header);

}

function getValues() {

  var result = [];

  for (let i = 1; i <= rowsCount; i++) {
    result.push(row);
  }

  return result;

}

function adjustRowsCount(size) {

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var lastRow = sheet.getMaxRows();

  if (lastRow >= size) {
    return;
  }

  var difference = size - lastRow + 1;
  sheet.insertRowsAfter(lastRow, difference);

}