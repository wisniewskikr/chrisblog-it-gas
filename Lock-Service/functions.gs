function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display "Hello World"', 'myFunction')    
    .addToUi();
}

function myFunction() {

  var active_spreadsheet = SpreadsheetApp.openById("1oUvCvGUhpyESD0P83_vhrOWBLkIJNUJqCmpBt7VQPNY");

// BEGIN - start lock here

var lock = LockService.getScriptLock();
try {
    lock.waitLock(5000); // wait 30 seconds for others' use of the code section and lock to stop and then proceed
} catch (e) {
    Logger.log('Could not obtain lock after 30 seconds.');
    return HtmlService.createHtmlOutput("<b> Server Busy please try after some time <p>")
    // In case this a server side code called asynchronously you return a error code and display the appropriate message on the client side
    // return "Error: Server busy try again later... Sorry :("
}

// note:  if return is run in the catch block above the following will not run as the function will be exited

var active_sheet = active_spreadsheet.getSheetByName("Sheet1");
active_sheet.getRange("A1").setValue('Hello World');
Utilities.sleep(30000);

//  Do lots of stuff - ie apply dynamic background colors based on previous entries colors, define the target range and set values, set data validations  

SpreadsheetApp.flush(); // applies all pending spreadsheet changes
lock.releaseLock();

}

function myFunctionOld() {

  var active_spreadsheet = SpreadsheetApp.openById("1oUvCvGUhpyESD0P83_vhrOWBLkIJNUJqCmpBt7VQPNY");
  var active_sheet = active_spreadsheet.getSheetByName("Sheet1");
  active_sheet.getRange("A1").setValue('Hello World');  

}