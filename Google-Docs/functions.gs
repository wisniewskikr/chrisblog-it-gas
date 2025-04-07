function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Write cell A1 to Google Docs', 'readFromCell')          
    .addToUi();
}

function readFromCell() {

  var spreadsheet = SpreadsheetApp.getActive();
  var value = spreadsheet.getRange('A1').getValue();
  writeToGoogleDoc('1qzGYeIe8JXBet8oE4a6Q8czt2AtOUXa5za71G5HqpNc', value);
  SpreadsheetApp.getUi().alert("Value of cell A1 was written in Google Doc.");

}

function writeToGoogleDoc(docId, value) {

  var doc = DocumentApp.openById(docId)
  var body = doc.getBody();

  var dataParagraph = body.insertParagraph(0, '');
  var headerText = dataParagraph.appendText('*** DATA FROM GSHEET ***\n');
  headerText.setBold(true);

  // Add in the audit log entry metadata.
  dataParagraph.appendText('Cell A1 value: ' + value + '\n');

}