function onOpen() {  

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Greeting')
    .addItem('Display "Hello World"', 'myFunction')    
    .addToUi();

  asyncFunction();

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
        return Promise.resolve("fired promise success");

    } catch (error) {
        return Promise.reject("fired promise error");
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