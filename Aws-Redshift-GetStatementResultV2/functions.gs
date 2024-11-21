function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Functions')
    .addItem('Redshift Data', 'myFunction')    
    .addToUi();
}

function myFunction() {

  var sql = "select * from GREETINGS";
  var recordArray = getDataFromRedshift(sql);
  fillGsheet(recordArray);

}

function initAWS() {
  AWS.init(accessKey, secretKey);
}

function getDataFromRedshift(sql) {

  initAWS();
  
  var executeStatement = runExecuteStatement(sql);
  var recordArray = null;
    
  do {    
    var describeStatement = runDescribeStatement(executeStatement.Id);    
    if (describeStatement.Status == "FAILED") {      
      throw new Error('Error during connection with Redshift Data API. Error description: ' + describeStatement.Error);
    }
  } while (describeStatement.Status !== "FINISHED");
    
  return getRecordArray(executeStatement);

}

function runExecuteStatement(sql) {

  var resultJson = AWS.request(
        typeAWS, 
        locationAWS,
        'RedshiftData.ExecuteStatement', 
        {"Version": versionAWS},
        method='POST',
        payload={
          "ClusterIdentifier": clusterIdentifierReshift, 
          "Database": defaultDatabaseRedshift,                     
          "DbUser": dbUserRedshift,
          "Sql": sql,
          "ResultFormat": "CSV"
        },
        headers={
          "X-Amz-Target": "RedshiftData.ExecuteStatement", 
          "Content-Type": "application/x-amz-json-1.1"
        }
  );  
  
  Logger.log("Execute Statement result: " + resultJson);  
  return JSON.parse(resultJson.getContentText());

}

function runDescribeStatement(id) {
  
  var resultJson = AWS.request(
      typeAWS, 
      locationAWS,
      'RedshiftData.DescribeStatement', 
      {"Version": versionAWS},
      method='POST',
      payload={
        "Id": id
      },
      headers={
        "X-Amz-Target": "RedshiftData.DescribeStatement", 
        "Content-Type": "application/x-amz-json-1.1"
      }
  )  
  
  Logger.log("Describe Statement result: " + resultJson);
  return JSON.parse(resultJson.getContentText());
  
}

function getRecordArray(executeStatement) {

  var recordArray = [];
  var nextToken = null;
  var statementResult = null;
  do {
    statementResult = runGetStatementResultV2(executeStatement.Id, nextToken);    
    recordArray.push(statementResult.Records);
    nextToken = statementResult.NextToken;
    Logger.log("Get Statement Result. Next Token: " + nextToken);    
  } while (statementResult.NextToken);  

  return recordArray;

}

function runGetStatementResultV2(id, nextToken) {
  var resultJson = AWS.request(
      typeAWS, 
      locationAWS,
      'RedshiftData.GetStatementResultV2', 
      {"Version": versionAWS},
      method='POST',
      payload={
        "Id": id,
        "NextToken" : nextToken
      },
      headers={
        "X-Amz-Target": "RedshiftData.GetStatementResultV2", 
        "Content-Type": "application/x-amz-json-1.1"
      }
  )
  
  Logger.log("Get Statement Result result: " + resultJson);
  return JSON.parse(resultJson.getContentText());

}

function fillGsheet(recordArray) {  

  for (var i = 0; i < recordArray.length; i++) {   
        
    var rows = recordArray[i];
    for (var j = 0; j < rows.length; j++) {

      const csv = rows[j].CSVRecords;
      const csvData = Utilities.parseCsv(csv);
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);

    }    

  }

}