var accessKeyAWS = "";
var secretKeyAWS = "";

function onInitDialog_() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowsCount = getIndexLastRowWithData(sheet);

  var response = {
    "rowsCount": rowsCount,
    "exportSizePackage": getExportSizePackage(),
    "threadsCountPerEnvExport": getThreadsCountPerEnvExport(),
    "tab": getActiveSheetName()
  }

  return JSON.stringify(response);
   
}

function onSubmitPackagesMultithreadExport(database, selectedColumnTypes, startIndex, stopIndex, tab, index) {

  var fileName = "demo_" + index;

  var sheet = getCurrentSheetOrByName(tab);
  var lastColumn = SpreadsheetApp.getActive().getActiveSheet().getLastColumn();

  var rangeHeader = "A1:" + columnToLetter(lastColumn) + 1;  
  var header = SpreadsheetApp
  .getActiveSpreadsheet()
  .getRange(rangeHeader)
  .getValues()  //  or .getDisplayValues()
  .map(r => r.join(","))
  .join("\n");

  var rangeCsv = "A" + startIndex + ":" + columnToLetter(lastColumn) + stopIndex;  
  var csv = SpreadsheetApp
  .getActiveSpreadsheet()
  .getRange(rangeCsv)
  .getValues()  //  or .getDisplayValues()
  .map(r => r.join(","))
  .join("\n");

  var data = header + "\n" + csv;
  var blob = Utilities.newBlob(data, MimeType.CSV, fileName + ".csv");

  var s3 = S3.getInstance(accessKeyAWS, secretKeyAWS);
 
  s3.putObject("wisniewskikr-demo", fileName, blob, {logRequests:true});

  var response = {}

  return JSON.stringify(response);
  
}

// ***** HELP METHODS ***** //

function getIndexLastRowWithData(sheet) {
  return sheet.getLastRow();
}

function getExportSizePackage() {
  return 5;
}

function getThreadsCountPerEnvExport() {
  return 10;
}

function getActiveSheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function getCurrentSheetOrByName(tab) {

  var sheet = null;

  var spreadsheet = SpreadsheetApp.getActive();
  if (tab == null) {
    sheet = spreadsheet.getActiveSheet();
  } else {
    sheet = SpreadsheetApp.getActive().getSheetByName(tab);
  }

  return sheet;

}

function columnToLetter(column) {

  var temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;

}