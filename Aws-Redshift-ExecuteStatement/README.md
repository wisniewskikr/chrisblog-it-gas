AWS REDSHIFT EXECUTE STATEMENT
===============================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1UNJi3EbPM5B_qkqpVem--IH6d8kxLOdY4nVSN1OQEbA/edit?usp=sharing


PRECONDITIONS
-------------

This project requires following preconditions:
* IAM role "demo-redshift-role" should be created. It should have following "permissions policies":
  * AmazonRedshiftFullAccess
* IAM user "demo-redshift-user" should be created. It should have following "permissions policies":
  * AmazonRedshiftFullAccess
* Cluster "redshift-cluster-1" with dbuser "awsuser" and default database "dev" should be created in AWS Redshift. It should use above created role. 
Following SQL query should be run there:
```
create table greetings (id int, message varchar);
insert into greetings (id, message) values (1, 'Hello World');
```


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to connect Gsheet with AWS Redshifd and run some execute statement (SQL).

##### Result 
When user click on menu: "Functions -> Redshift Data" then data should be taken form Redshift and display in Gsheet.


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
* Choose "Functions -> Redshift Data";
* (Optional) Sometimes you will be asked to confirm permissions.