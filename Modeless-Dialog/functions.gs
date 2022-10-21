function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display Hello World', 'myFunction')    
    .addToUi();
}

function myFunction() {   
  
  var htmlOutput = HtmlService
    .createHtmlOutput('<p>Hello World</p>')
    .setWidth(250)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'Greeting');

}