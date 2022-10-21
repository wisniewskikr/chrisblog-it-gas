var repeatCount = 3;

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display "Hello World"', 'myFunctionRepeat')    
    .addToUi();
}

function myFunctionRepeat() {

  try {

    myFunction();
    
  } catch (error) {    

    if (repeatCount > 0) {
      Logger.log("repeatCount: " + repeatCount);
      repeatCount--;
      myFunctionRepeat();
    } else {
      throw error;
    }

  }

}

function myFunction() {
  
  throw new Error('Hello World Error');
  
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue('Hello World');  

}