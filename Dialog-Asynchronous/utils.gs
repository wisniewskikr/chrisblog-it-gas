function callLibraryFunction(func, args){
  return this[func].apply(this, args);
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}