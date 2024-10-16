function getDropTableIfExistsFromSchemaSql(schemaName, tableName) {
  return `DROP TABLE IF EXISTS ${schemaName}.${tableName}`;
}

function getCreateTableSql(schemaName, tableName, columnNames, columnTypes) {

  var tableColumns = [];
  for (var i = 0; i < columnNames.length; i++) {
    tableColumns.push(columnNames[i] + " " + columnTypes[i]);
  }
  var tableColumnsString = tableColumns.join(", ");

  return `CREATE TABLE ${schemaName}.${tableName} (${tableColumnsString})`;
}

function getInsertIntoSql(schemaName, tableName, columnNames, columnTypes, values) {

  var tableColumns = [];
  for (var column of columnNames) {
    tableColumns.push(column);
  }
  var tableColumnsString = tableColumns.join(", ");

  var tableValues = [];
  for (var row of values) {
    tableValues.push("(" + returnValuesAdjustedToType(row, columnTypes) + ")");
  }
  var tableValuesString = "VALUES " + tableValues.join(", ");

  return `INSERT INTO ${schemaName}.${tableName} (${tableColumnsString}) ${tableValuesString}`;
}

function getColumnsSql(schemaName, tableName) {
  return `SELECT * FROM ${schemaName}.${tableName} LIMIT 0`;
}

function getDataSql(schemaName, tableName) {
  return `SELECT * FROM ${schemaName}.${tableName}`;
}

function returnValuesAdjustedToType(row, columnTypes) {

  var result = [];

  for (var i = 0; i < row.length; i++) {

    if (row[i] == '' || row[i] == null) {
      result.push('null');
      continue;
    }

    var columnType = columnTypes[i];
    if (columnType == "int"||
        columnTypes == "double") {
          result.push(row[i]);
    } else {
          result.push("'" + row[i] + "'");
    }

  }

  return result.join(",");

}