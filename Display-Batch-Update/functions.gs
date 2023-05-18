function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Test')
    .addItem('Run Batch Update"', 'myFunction')    
    .addToUi();
}

function myFunction() {

  /* Written by Amit Agarwal */
  /* Web: ctrlq.org  Email: amit@labnol.org */
  
  var data = [
    { 
      range: "Sheet1!A1",   // Update single cell
      values: [
        ["A1"]
      ]
    },
    {
      range: "Sheet1!B1:B3", // Update a column
      values: [
        ["B1"],["B2"],["B3"]
      ]
    },
    {
      range: "Sheet1!C1:E1", // Update a row
      values: [
        ["C1","D1","E1"]
      ]
    },
    {
      range: "Sheet1!F1:H2", // Update a 2d range
      values: [
        ["F1", "F2"],
        ["H1", "H2"]
      ]
    }];
  
  var resource = {
    valueInputOption: "USER_ENTERED",
    data: data
  };
  
  Sheets.Spreadsheets.Values.batchUpdate(resource, SpreadsheetApp.getActiveSpreadsheet().getId());
  
}