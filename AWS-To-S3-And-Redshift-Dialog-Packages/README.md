AWS TO S3 AND REDSHIFT DIALOG PACKAGES
======================================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/11-__NDNcFvbFL5dihGNfJsRaPJQaB5eMnSVX5qo_WYA/edit?usp=sharing


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to export data in packages from Gsheet to AWS S3 and then copy them from AWS S3 to AWS Redshift. 

##### Details
When user choose custom menu in Gsheet then Google Apps Script function is run and Dialog should be displayed in Gsheet.
This Dialog contains Submit button. After clicking on Submit button data are exported in packages from Gsheet to AWS S3.
Then data are copied from AWS S3 to AWS Redshift.

##### Result 
Data should be exported to AWS S3 and AWS Redshift in many packages and dialog should be closed.

##### Precondition
This project requires following preconditions:
* IAM role "aws-from-s3-to-redshift" should be created. It should have following "permissions policies":
  * AmazonRedshiftFullAccess
  * AmazonS3FullAccess
* IAM user "demo-s3-user" should be created. It should have following "permissions policies":
  * AmazonRedshiftFullAccess
  * AmazonS3FullAccess
* Bucket "wisniewskikr-demo" should be created in AWS S3
* File "demo.csv" should be uploaded to above bucket in AWS S3
* Cluster "redshift-cluster-1" with dbuser "awsuser" and default database "dev" should be created in AWS Redshift. It should use above created role. 
Following SQL query should be run there:
```
CREATE TABLE demo (id int4, name varchar(20))
distkey(id) sortkey(name);
```
* (Optional) Following SQL queries can be run on AWS Redshift to test copy mechanism:
```
SELECT * FROM demo;

COPY demo FROM 's3://wisniewskikr-demo/demo.csv'
iam_role 'arn:<arn>/aws-from-s3-to-redshift'
ignoreheader 1
delimiter ',';

DELETE FROM demo;
```
* Following files should be updated:
  * configuration.gs: with accessKey and secretKey related to above created user
  * functions.gs: with arn of above created role


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