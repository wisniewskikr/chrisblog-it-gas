function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu Item')
    .addItem('Display Groups', 'displayGropus')      
    .addToUi(); 
}

function displayGropus() {

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange('A1').setValue('Your Gropus'); 

  var groupsArray = [];
  var groups = GroupsApp.getGroups();
  for(var group of groups) {

    Logger.log("***** Group Email: " + group.getEmail());
    groupsArray.push(group.getEmail());

  }

  // Convert array to 2D array required by setValues()
  var data = groupsArray.map(function(item) {
    return [item];
  });

  if (groupsArray.length != 0) {
    // Set values starting from cell A2
    sheet.getRange(2, 1, data.length, 1).setValues(data);
  }

}
