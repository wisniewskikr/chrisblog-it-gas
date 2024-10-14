function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Functions')
    .addItem('Export', 'exportFunction') 
    .addItem('Import', 'importFunction')    
    .addToUi();
}

function exportFunction() {

  let schemaName = "public";
  let tableName = "greetings";
  let columnNames = getNormalizeNamesActiveSheet();
  let columnTypes = getColumnTypesByColumnNames(columnNames);
  let values = getValuesActiveSheet();

  let sql;

  sql = getDropTableIfExistsFromSchemaSql(schemaName, tableName);
  runSqlOnRedshift(sql);

  sql = getCreateTableSql(schemaName, tableName, columnNames, columnTypes);
  runSqlOnRedshift(sql);

  sql = getInsertIntoSql(schemaName, tableName, columnNames, columnTypes, values);
  runSqlOnRedshift(sql);

}

function importFunction() {

  let schemaName = "public";
  let tableName = "greetings";

  let sql;

  sql = getColumnsSql(schemaName, tableName);
  const statementResult = getStatementResultFromRedshift(sql);
  const columns = getColumnFromStatementResult(statementResult);
  createHeader(columns);

  sql = getDataSql(schemaName, tableName);
  const recordArray = getDataFromRedshift(sql);
  fillGsheet(recordArray);

}