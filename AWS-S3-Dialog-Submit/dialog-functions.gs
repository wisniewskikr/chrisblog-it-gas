function onInitDialog_() {

  var response = {
    "text": "Set Your Name Here"
  }

  return JSON.stringify(response);
   
}

function onFormSubmit_(text) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue('Hello World ' + text);
}