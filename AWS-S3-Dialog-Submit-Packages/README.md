AWS S3 DIALOG SUBMIT PACKAGES
==============================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/11-__NDNcFvbFL5dihGNfJsRaPJQaB5eMnSVX5qo_WYA/edit?usp=sharing


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to export data in packages from Gsheet to AWS S3. 

##### Details
When user choose custom menu in Gsheet then Google Apps Script function is run and Dialog should be displayed in Gsheet.
This Dialog contains Submit button. After clicking on Submit button data are exported in packages from Gsheet to AWS S3.

##### Result 
Data should be exported to AWS S3 in many packages and dialog should be closed.


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