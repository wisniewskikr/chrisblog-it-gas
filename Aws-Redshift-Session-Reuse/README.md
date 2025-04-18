AWS REDSHIFT SESSION REUSE
==========================


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/1BBp__1M39T3hJ2OuYYUTPYYaYn-X-0mGaKWokbD4SyI/edit?usp=sharing


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


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to implement session reuse in AWS Redshift API. Session reuse means that session is not closed and can be reused again. It should increase performance. Application contains following functionalities:
* **Export**: export data from Google Gsheet to AWS Redshift
* **Import**: import data from AWS Redshift to Google Gsheet
  

LAUNCH
------

To launch project please:
* Open Gsheet;
* Prepare data to export: first row should contain column's names and other rows should contain data
* Choose "Functions -> Export" for export data
* Choose "Functions -> Import" for import data