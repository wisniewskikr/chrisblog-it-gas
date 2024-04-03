AWS FROM S3 TO REDSHIFT
=======================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1XxeUNvzMOfxj130hlZ5nyZTw3cAvH775vMVZeH4dX6E/edit#gid=0


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to copy data from AWS S3 to AWS Redshift using Google Apps Script. 
Data is stored in AWS S3 as CSV file "demo.csv". Data is copied to existing AWS Redshift table "demo".

##### Result 
When user click on menu: "Functions -> Copy Data From AWS S3 to AWS Redshift" then data should be copied.

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
* In file "configuration.gs" is all configuration to AWS Redshift;
* In file "aws.gs" are all functions connected with AWS;
* In file "functions.gs" create all functions;
* In AWS Redshift has to be created new cluster;
* In AWS IAM has to be created new user with Administrator role.
  

LAUNCH
------

To launch project please:
* Open Gsheet;
* Choose "Functions -> Copy Data From Redshift To S3";
* (Optional) Sometimes you will be asked to confirm permissions.