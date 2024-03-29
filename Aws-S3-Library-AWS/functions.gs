var accessKeyAWS = "";
var secretKeyAWS = "";

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('S3 Functions')
    .addItem('Export Sheet to S3 as CSV', 'exportS3AsCSV')   
    .addToUi();
}

function exportS3AsCSV() {

  S3.init(accessKeyAWS, secretKeyAWS);  // Please set this.
  var region = "us-east-1"; //  Please set this.

  var csv = SpreadsheetApp
  .getActiveSpreadsheet()
  .getDataRange()
  .getValues()  //  or .getDisplayValues()
  .map(r => r.join(","))
  .join("\n");
  var blob = Utilities.newBlob(csv, MimeType.CSV, "demo.csv");

  S3.putObject("wisniewskikr-demo", blob.getName(), blob, region);

}