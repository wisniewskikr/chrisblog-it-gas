function onOpen(e) {
  
  const prop = PropertiesService.getScriptProperties();
  const sheetName = e.range.getSheet().getSheetName();
  prop.setProperty("previousSheet", sheetName);

}

function onSelectionChange(e) {
  
  const prop = PropertiesService.getScriptProperties();
  const previousSheet = prop.getProperty("previousSheet");
  const range = e.range;
  const sheetName = range.getSheet().getSheetName();
  
  if (sheetName != previousSheet) {
    Logger.log(`Changed tab from ${previousSheet} to ${sheetName}`);    
  }

  prop.setProperty("previousSheet", sheetName);

}