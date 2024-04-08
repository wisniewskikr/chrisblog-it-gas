function onInitDialog_() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowsCount = getIndexLastRowWithData(sheet);

  var response = {
    "rowsCount": rowsCount,
    "exportSizePackage": getExportSizePackage(),
    "threadsCountPerEnvExport": getThreadsCountPerEnvExport(),
    "tab": getActiveSheetName()
  }

  return JSON.stringify(response);
   
}

function onSubmitSchemaAndTablePrimaryExport(value, columnTypes, tab) {

  var dbUser = "awsuser";
  var database = "dev";
  var schema = "public";
  var tableName = "demo";
  var columnNames = getNormalizeColumnNamesByTab(tab);
  columnTypes = getColumnTypes(columnNames);
  var type = null;

  createTableInRedshift(database, schema, dbUser, columnTypes, type, columnNames, tab, tableName);

}

function onSubmitPackagesMultithreadExport(database, selectedColumnTypes, startIndex, stopIndex, tab, index) {

  var fileName = "demo_" + index;

  var sheet = getCurrentSheetOrByName(tab);
  var lastColumn = SpreadsheetApp.getActive().getActiveSheet().getLastColumn();

  var rangeHeader = "A1:" + columnToLetter(lastColumn) + 1;  
  var header = SpreadsheetApp
  .getActiveSpreadsheet()
  .getRange(rangeHeader)
  .getValues()  //  or .getDisplayValues()
  .map(r => r.join(","))
  .join("\n");

  var rangeCsv = "A" + startIndex + ":" + columnToLetter(lastColumn) + stopIndex;  
  var csv = SpreadsheetApp
  .getActiveSpreadsheet()
  .getRange(rangeCsv)
  .getValues()  //  or .getDisplayValues()
  .map(r => r.join(","))
  .join("\n");

  var data = header + "\n" + csv;
  var blob = Utilities.newBlob(data, MimeType.CSV, fileName + ".csv");

  S3.init(accessKey, secretKey);  // Please set this.
  var region = "us-east-1"; //  Please set this.
  S3.putObject("wisniewskikr-demo", fileName, blob, region);

  var response = {}

  return JSON.stringify(response);
  
}

function onSubmitPackagesMultithreadCopy(database, selectedColumnTypes, startIndex, stopIndex, tab, index) {

  var sql = "COPY demo FROM 's3://wisniewskikr-demo/demo_" + index + "' iam_role 'arn:aws:iam::381196861170:role/aws-from-s3-to-redshift' ignoreheader 1 delimiter ',';"
  getDataFromRedshift(sql);

  S3.init(accessKey, secretKey);  // Please set this.
  var region = "us-east-1"; //  Please set this.
  S3.deleteObject("wisniewskikr-demo", "demo_" + index, region);

  var response = {}

  return JSON.stringify(response);
  
}

// ***** HELP METHODS ***** //

function getIndexLastRowWithData(sheet) {
  return sheet.getLastRow();
}

function getExportSizePackage() {
  return 5;
}

function getThreadsCountPerEnvExport() {
  return 10;
}

function getActiveSheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function getCurrentSheetOrByName(tab) {

  var sheet = null;

  var spreadsheet = SpreadsheetApp.getActive();
  if (tab == null) {
    sheet = spreadsheet.getActiveSheet();
  } else {
    sheet = SpreadsheetApp.getActive().getSheetByName(tab);
  }

  return sheet;

}

function columnToLetter(column) {

  var temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;

}

function getNormalizeColumnNamesByTab(tab) {

  var result = [];

  var columns = getColumnNamesByTab(tab);
  for (var column of columns) {
    result.push(normalizeName(column));
  }

  return result;

}

function getColumnNamesByTab(tab) {

  var sheet = SpreadsheetApp.getActive().getSheetByName(tab);
  var lastColumnLetter = getLetterLastColumnWithData(sheet);
  var result = sheet.getRange("A1:" + lastColumnLetter + "1").getValues()[0];
  validateColumnNames(result);
  return result;

}

function getLetterLastColumnWithData(sheet) {
  return columnToLetter(getIndexLastColumnWithData(sheet));
}

function validateColumnNames(columnNamesArray) {

  for (var columnName of columnNamesArray) {

   if (columnName == null || columnName == '') {
    throw new Error("Column Name can not be empty (first row)");
   }

  }

}

function normalizeName(name) {

	if (!isNaN(name)) {
		return name;
	}

  return name
	.toLowerCase()
	.replaceAll(" ", "_")
	.replaceAll(".", "_")
  .replaceAll(",", "_")
	.replaceAll("-", "_")
  .replaceAll("\\", "_");

}

function getIndexLastColumnWithData(sheet) {
  return sheet.getLastColumn();
}

function getColumnTypes(columnNames) {

  var columnTypes = [];

  for (var columnName of columnNames) {
    columnTypes.push("varchar");
  }

  return columnTypes;

}

function createTableInRedshift(database, schema, dbUser, columnTypes, type, columnNames, tab, tableName) {  

  dropTableIfExists(database, schema, tableName, dbUser, type);

  var sql = getCreateTableSql(schema, tableName, columnNames, columnTypes);

  // handleExportStatementResult(sql, database, dbUser, type);
  getDataFromRedshift(sql);

}

function dropTableIfExists(database, schema, tableName, dbUser, type) {

  var sql = getDropTableIfExistsFromSchemaSql(schema, tableName);
  // handleExportStatementResult(sql, database, dbUser, type);
  getDataFromRedshift(sql);

}

function getDropTableIfExistsFromSchemaSql(schemaName, tableName) {
  return `DROP TABLE IF EXISTS ${schemaName}.${tableName}`;
}

function getCreateTableSql(schemaName, tableName, columnNames, columnTypes) {

  var tableColumns = [];
  for (var i = 0; i < columnNames.length; i++) {
    tableColumns.push("\"" + columnNames[i] + "\" " + columnTypes[i]);
  }
  var tableColumnsString = tableColumns.join(", ");

  return `CREATE TABLE ${schemaName}.${tableName} (${tableColumnsString})`;
}

// ***** REDSHIFT FUNCTIONS ***** //

// function myFunction() {

//   var sql = "COPY demo FROM 's3://wisniewskikr-demo/demo.csv' iam_role 'arn:<arn>/aws-from-s3-to-redshift' ignoreheader 1 delimiter ',';"
//   getDataFromRedshift(sql);

//   Browser.msgBox("Data is copied from AWS S3 to AWS Redshift.");

// }

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