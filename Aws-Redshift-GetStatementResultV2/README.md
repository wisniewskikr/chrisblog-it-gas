AWS REDSHIFT EXECUTE STATEMENT
===============================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1WXh3vW3bwg0zxj1P0-tqcM-SOS1txOXNXCP2mJN8Tbo/edit?usp=sharing


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
* **SQL Queries**: Following SQL query should be run in database:
```
CREATE TABLE "public"."greetings"("id" INTEGER NULL, "message" VARCHAR NULL) ENCODE AUTO;
INSERT INTO "public"."greetings" ("id", "message") values (1, 'Hello World');
```


DESCRIPTION
-----------

##### Goal
The goal of this project is to present how to use GetStatementResultV2. Version 2 enables receiving data as CSV file, not as JSON file. To do it:
* In **ExecuteStatement** you have to add following property: **"ResultFormat": "CSV"**
* In **GetStatementResult** you have to use **GetStatementResultV2**.

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