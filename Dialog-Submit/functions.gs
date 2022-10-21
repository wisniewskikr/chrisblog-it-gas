function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display Dialog', 'myFunction')    
    .addToUi();
}

function myFunction() {   
  
  var htmlOutput = HtmlService.createTemplateFromFile('dialog')
    .evaluate().setHeight(200);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Dialog');

}