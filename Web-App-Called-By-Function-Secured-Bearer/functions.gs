function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Demo')
    .addItem('Call API', 'callApi')    
    .addToUi();
}

function callApi() {

  const token = "";

  var params = {
    method:"GET",
    contentType:'application/json',
    headers:{Authorization:"Bearer "+token},
    muteHttpExceptions:true
  };


  var url = 'https://cloud.getdbt.com/api/v2/accounts/109901/jobs';
  var response = UrlFetchApp.fetch(url, params);
  var responseJson = JSON.parse(response);

  Browser.msgBox(responseJson.data[0].name);

}