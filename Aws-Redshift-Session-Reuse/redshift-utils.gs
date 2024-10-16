const SQL = "sql";
const DATA = "data";
const STAT_RESULT = "sr";

function initAWS() {
  AWS.init(accessKey, secretKey);
}

function runSqlOnRedshift(sql) {
  handleRedshift(sql, SQL);
}

function getStatementResultFromRedshift(sql) {
  return handleRedshift(sql, STAT_RESULT);
}

function getDataFromRedshift(sql) {
  return handleRedshift(sql, DATA);
}

function handleRedshift(sql, type) {

  initAWS();
  
  var executeStatement = runExecuteStatement(sql);
  var recordArray = null;
    
  do {    
    var describeStatement = runDescribeStatement(executeStatement.Id);    
    if (describeStatement.Status == "FAILED") {      
      throw new Error('Error during connection with Redshift Data API. Error description: ' + describeStatement.Error);
    }
  } while (describeStatement.Status !== "FINISHED");
    
  if (type == STAT_RESULT || type == DATA) {    
    return getRecordArray(executeStatement, type);
  }  

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

function getRecordArray(executeStatement, type) {

  var recordArray = [];
  var nextToken = null;
  var statementResult = null;
  do {
    statementResult = runGetStatementResult(executeStatement.Id, nextToken);    
    recordArray.push(statementResult.Records);
    nextToken = statementResult.NextToken;
    Logger.log("Get Statement Result. Next Token: " + nextToken);    
  } while (statementResult.NextToken);

  if (type == DATA) {
    return recordArray;
  }  else if (type == STAT_RESULT) {
    return statementResult;
  }

  

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

function getColumnFromStatementResult(statementResult) {

  var columns = [];

  var columnMetadata = statementResult.ColumnMetadata;

  for (var i = 0; i < columnMetadata.length; i++) {
    columns.push(columnMetadata[i].name);
  }

  return columns;

}