AWS REDSHIFT BATCH EXECUTE STATEMENT COMMENT
============================================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1QfRnnzHbJrKOP-GPNWK6DFOMah1FiGd1dccGBR8NhGw/edit?usp=sharing


PRECONDITIONS
-------------

This project requires following preconditions:
1. IAM role should be created:
* **Select trusted entity**: AWS Service -> Redshift -> Redshift Customizable
* **Add permissions**: AmazonRedshiftFullAccess
* **Name, review and create**: demo-redshift-role
1. IAM user should be created:
* **Specify user details**: "User name" should be "demo-redshift-user"
* **Set permissions**: Attach policies directly -> AmazonRedshiftFullAccess and AmazonRedshiftDataFullAccess
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
```


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to connect Gsheet with AWS Redshifd and run some batch execute statement. This batch execute statement enables to run read and write data to and from table. Additionally comments about user are added to read and write SQL queries.

In AWS Redshift you can read all queries (with comments) done on some specific table with following query:
SELECT 
    q.userid,
    u.usename,
    q.query,
    q.starttime,
    q.endtime,
    q.aborted,
    qt.text
FROM stl_query q
JOIN stl_querytext qt 
    ON q.query = qt.query
JOIN pg_user u 
    ON q.userid = u.usesysid
WHERE qt.text ILIKE '%your_table_name%'
ORDER BY q.starttime DESC;

##### Result 
When user click on menu: "Functions -> Export" then data should be exported to Redshift (row 2, columns A "id" and columnt B "message").
When user click on menu: "Functions -> Import" then data should be imported from Redshift (row 2, columns A "id" and columnt B "message").


IMPLEMENTATION
-----------

Implementation details:
* In file "configuration.gs" is all configuration to AWS Redshift;
* In file "aws.gs" are all functions connected with AWS;
* In file "functions.gs" create all functions;
* In AWS Redshift has to be created new cluster;
* In AWS IAM has to be created new user with roles "AmazonRedshiftFullAccess" and "AmazonRedshiftDataFullAccess". 