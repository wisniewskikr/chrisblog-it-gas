function onOpen() {  

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display "Hello World"', 'myFunction')    
    .addToUi();  
  
  syncFunction();

  // This solution also works fine
  // asyncFunction();

}

function syncFunction() {

  try {   

      let endIndexI = 100000;
      let endIndexJ = 100000;
      for (let i = 0; i < endIndexI; i++) {
          for (let j = 0; j < endIndexJ; j++) {            
          }
      }
      addTestToA1("sync success")

  } catch (error) {
      Browser.msgBox("sync error");
  }

}

function myFunction() {
  Browser.msgBox("Hello World");  
}

function getPromise() {

    try {   

        let endIndexI = 100000;
        let endIndexJ = 100000;
        for (let i = 0; i < endIndexI; i++) {
            for (let j = 0; j < endIndexJ; j++) {            
            }
        }
        return Promise.resolve("async success");

    } catch (error) {
        return Promise.reject("async error");
    }

}

function asyncFunction() {

    let myPromise = getPromise();

    myPromise
    .then(response => {
        addTestToA1(response);
    })
    .catch(error => {
        Browser.msgBox("Error: " + error);
    });

}

 function addTestToA1(text) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue(text);
};