function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Export to S3')
    .addItem('Display Dialog', 'myFunction')    
    .addToUi();
}

function myFunction() {   
  
  var htmlOutput = HtmlService.createTemplateFromFile('dialog')
    .evaluate().setHeight(200);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Dialog');

}