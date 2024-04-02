AWS S3 DIALOG SUBMIT
====================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1O19OvA1yorsZrdwyM2VpEKhtl_YY5QIxKjSn27sPb54/edit?usp=sharing


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how export data from Gsheet to AWS S3 using Dialog.

##### Details
When user choose custom menu in Gsheet then Google Apps Script function is run and Dialog should be displayed in Gsheet.
This Dialog contains Submit button. After clicking on Submit button all data from Gsheet should be exported to AWS S3 as CSV file.

##### Result 
Data should be exported to AWS S3.


IMPLEMENTATION
-----------

Implementation details:
* In file "functions.gs" create all functions.
  

LAUNCH
------

To launch project please:
* Open Gsheet;
* Choose "Export to S3 -> Display Dialog";
* (Optional) Sometimes you will be asked to confirm permissions.