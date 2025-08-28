function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu Item')
    .addItem('Display Groups', 'displayGropus')      
    .addToUi(); 
}

function displayGropus() {
  var email = Session.getActiveUser().getEmail();
  const memberships = getGroupsForUser(email);
  const ids = memberships.map(item => item.groupKey.id);

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange('A1').setValue('Your Gropus');
  
  var values = ids.map(function(id) { return [id]; });
  sheet.getRange(2, 1, values.length, 1).setValues(values);
}

const groups = CloudIdentityGroups.Groups;

function getGroupsForUser(userEmail) {
  const memberships = [];
  let pageToken;

  do {
    const response = groups.Memberships.searchDirectGroups('groups/-', {
      query: `member_key_id=='${userEmail}'`,
      pageToken: pageToken,
    });
    if (response.memberships) {
      memberships.push(...response.memberships);
    }
    pageToken = response.nextPageToken;
  } while (pageToken);

  return memberships;  // Each membership contains group info
}
