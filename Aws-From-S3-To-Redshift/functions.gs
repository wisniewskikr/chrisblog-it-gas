function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Functions')
    .addItem('Copy data from AWS S3 to AWS Redshift', 'myFunction')    
    .addToUi();
}

function myFunction() {

  var sql = "COPY demo FROM 's3://wisniewskikr-demo/demo.csv' iam_role 'arn:<arn>/aws-from-s3-to-redshift' ignoreheader 1 delimiter ',';"
  getDataFromRedshift(sql);

  Browser.msgBox("Data is copied from AWS S3 to AWS Redshift.");

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
          "Sql": sql
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
    statementResult = runGetStatementResult(executeStatement.Id, nextToken);    
    recordArray.push(statementResult.Records);
    nextToken = statementResult.NextToken;
    Logger.log("Get Statement Result. Next Token: " + nextToken);    
  } while (statementResult.NextToken);  

  return recordArray;

}

function runGetStatementResult(id, nextToken) {
  var resultJson = AWS.request(
      typeAWS, 
      locationAWS,
      'RedshiftData.GetStatementResult', 
      {"Version": versionAWS},
      method='POST',
      payload={
        "Id": id,
        "NextToken" : nextToken
      },
      headers={
        "X-Amz-Target": "RedshiftData.GetStatementResult", 
        "Content-Type": "application/x-amz-json-1.1"
      }
  )

  Logger.log("Get Statement Result result: " + resultJson);
  return JSON.parse(resultJson.getContentText());

}