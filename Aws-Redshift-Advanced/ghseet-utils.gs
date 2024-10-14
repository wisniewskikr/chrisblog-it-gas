function fillGsheet(recordArray) {  
  
  var rowIndex = 1;
  for (var i = 0; i < recordArray.length; i++) {   
        
    var rows = recordArray[i];
    for (var j = 0; j < rows.length; j++) {
      var columns = rows[j];
      rowIndex++;
      var columnIndex = 'A';
      
      for (var k = 0; k < columns.length; k++) {
        
        var field = columns[k];        
        var value = getFieldValue(field);
        var range = columnIndex + rowIndex;
        addToCell(range, value);

        columnIndex = nextChar(columnIndex);

      }

    }

  }

}

function getFieldValue(field) {

  if (field.isNull != null) {
    return null;
  }

  if (field.stringValue != null) {
    return field.stringValue;
  }

  if (field.longValue != null) {
    return field.longValue;
  }

  if (field.doubleValue != null) {
    return null;
  }

  if (field.booleanValue != null) {
    return field.booleanValue;
  }

  if (field.blobValue != null) {
    return field.blobValue;
  }

  Logger.log("Can not find value for following field: " + JSON.stringify(field));
  return null;

}

function nextChar(c) {
    var column = letterToColumn(c);
    column++;
    return columnToLetter(column);
}

 function addToCell(range, value) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange(range).setValue(value);  
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

function letterToColumn(letter) {
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function getNormalizeNamesActiveSheet() {

  var result = [];

  var columns = getColumnNamesActiveSheet();
  for (var column of columns) {
    result.push(normalizeName(column));
  }

  return result;

}

function getColumnNamesActiveSheet() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastColumnLetter = getLetterLastColumnWithData(sheet);
  var result = sheet.getRange("A1:" + lastColumnLetter + "1").getValues()[0];
  return result;

}

function getColumnTypesByColumnNames(columnNames) {
  return new Array(columnNames.length).fill("varchar");
}

function getValuesActiveSheet() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastColumnIndex = getIndexLastColumnWithData(sheet);
  var lastRowIndex = getIndexLastRowWithData(sheet);
  return sheet.getRange(2, 1, lastRowIndex - 1, lastColumnIndex).getDisplayValues();

}

function getLetterLastColumnWithData(sheet) {
  return columnToLetter(getIndexLastColumnWithData(sheet));
}

function getIndexLastColumnWithData(sheet) {
  return sheet.getLastColumn();
}

function getIndexLastRowWithData(sheet) {
  return sheet.getLastRow();
}

function normalizeName(name) {
  return name.toLowerCase().replace(" ", "_");
}

function createHeader(columns) { 

  var spreadsheet = SpreadsheetApp.getActive();
  var range = "A1:" + columnToLetter(columns.length) + "1";
  var values = [columns];
  spreadsheet.getRange(range)
    .setValues(values)
    .setBackground('#4c1130')
    .setFontColor('#ffffff')
    .setFontWeight('bold');

  spreadsheet.setFrozenRows(1); 

}