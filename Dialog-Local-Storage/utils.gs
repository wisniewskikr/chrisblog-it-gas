function callLibraryFunction(func, args){
  return this[func].apply(this, args);
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
