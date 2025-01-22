function onInitExportDialog() {

  let results = [];
  let maxValue;
  let columnAsLetter;
  const sh = SpreadsheetApp.getActive();
  // var maxValue = Math.max(...sh.getRange(2, 1, sh.getLastRow(), 1).getValues().flat());

  for (let i = 1; i <= sh.getLastColumn(); i++) {

    maxValue = getMaxVarLenghtByColumn(i);
    columnAsLetter = columnToLetter(i);
    results.push(`Max length in column ${columnAsLetter} is ${maxValue}`);

  }

  

  var response = {
    "text": results.join("; ")
  }

  return JSON.stringify(response);
   
}

function getMaxVarLenghtByColumn(column) {

  const start = Date.now();

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getRange(2, column, sheet.getLastRow() - 1).getValues().flat();
  const result = values.reduce((max, str) => Math.max(max, str.length), 0);

  const end = Date.now(); // End timing
  Logger.log(`***** Estimation max var length duration for column ${column} is: ${end - start} ms`);

  return result;

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