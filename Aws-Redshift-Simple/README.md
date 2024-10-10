AWS REDSHIFT SIMPLE
===================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1tdwad9QJ9LKw8HamLOhU0lEYEGRwN9fFNft6bVHp0Yk/edit?usp=sharing


PRECONDITIONS
-------------

This project requires following preconditions:
1. IAM role should be created:
* **Select trusted entity**: AWS Service -> Redshift -> Redshift Customizable
* **Add permissions**: AmazonRedshiftFullAccess
* **Name, review and create**: demo-redshift-role
1. IAM user should be created:
* **Specify user details**: "User name" should be "demo-redshift-user"
* **Set permissions**: Attach policies directly -> AmazonRedshiftFullAccess
* **Review and create**: click the button "Create user"
1. Generate access key for IAM user:
* **Choose user**: click the link "demo-redshift-user"
* **Create access key**: Security credentials -> Access keys -> Create access key 
* **Access key best practices & alternatives**: choose "Application running outside AWS"
* **Set description tag**: N/A
* **Retrieve access keys**: click the button "Download .csv file"
1. Create AWS Redshift Cluster
* **Node type**: choose "ra3.large"
* **Nubmer of nodes**: 1
* **Database encryption**: choose "Disable cluster encryption"
* **Cluster permissions**: click the button "Associate IAM roles" and then choose "demo-redshift-role"
1. Create table and fill it with data
Following SQL query should be run there:
```
CREATE TABLE "public"."greetings"("id" INTEGER NULL, "message" VARCHAR NULL) ENCODE AUTO;
INSERT INTO "public"."greetings" ("id", "message") values (1, 'Hello World');
SELECT * FROM "public"."greetings";
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