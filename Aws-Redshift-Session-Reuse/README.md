AWS REDSHIFT SESSION REUSE
==========================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1EXbz6VYL9iqb_BpC_I3cVIHOiNQg9T7QROKFTxt5mgA/edit?usp=sharing


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to connect Gsheet with AWS Redshift. 

##### Result 
When user click on menu: "Functions -> Redshift Schemas" then schemas should be taken form Redshift and display as alert in Gsheet.


IMPLEMENTATION
-----------

Implementation details:
* In file "configuration.gs" is all configuration to AWS Redshift;
* In file "aws.gs" are all functions connected with AWS;
* In file "functions.gs" create all functions;
* In AWS Redshift has to be created new cluster;
* In AWS IAM has to be created new user with roles "AmazonRedshiftFullAccess" and "AmazonRedshiftDataFullAccess". 
  

LAUNCH
------

To launch project please:
* Open Gsheet;
* Choose "Functions -> Redshift Schemas";
* (Optional) Sometimes you will be asked to confirm permissions.