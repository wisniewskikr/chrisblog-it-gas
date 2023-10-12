function myFunction() {  
  Browser.msgBox("Trigger Installable Code - onOpen()");  
}

function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Init Trigger', 'createSpreadsheetOpenTrigger')
    .addToUi();
}

function createSpreadsheetOpenTrigger() {

  if (triggerExists('ON_OPEN', 'myFunction')) {
    return;
  }

  ScriptApp.newTrigger('myFunction')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onOpen()
      .create();

}

function triggerExists(eventType, handlerFunction) {

  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;
  triggers.forEach(function (trigger) {
    if(trigger.getEventType() == eventType &&
      trigger.getHandlerFunction() == handlerFunction)
        triggerExists = true;
  });

  return triggerExists;

}