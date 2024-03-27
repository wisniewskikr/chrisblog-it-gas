AWS S3
======


GSHEET URL
----------

* **Gsheet URL**: https://docs.google.com/spreadsheets/d/10I-uS1ixOz-hiV9xXbkyqpvEhMjilOnJd0rAebLtAog/edit?usp=sharing


DESCRIPTION
-----------

##### Goal
The goal of this project is to show how to import and export data from and to AWS S3 using Google Apps Script. Functions:
- Import: content of file "demo.csv" is displayed in Browser;
- Exprort: file "demo.txt" with content "Hello World" is created in code and exported to S3. 

##### Details
Data are imported and exported from and to AWS S3 using Google Apps Script. Additional library "S3" is used here.

##### Result 
Text "Hello World" should be displayed in Alert.


IMPLEMENTATION
--------------

Implementation details:
* Set up S3 bucket **wisniewskikr-demo** and upload there some test file **demo.csv**. How to do it you have described here: https://docs.google.com/document/d/1MgS-062m6b3OUuYI2c-niROBXruL_dHpeSmmbwadJ40/edit#heading=h.x5ouo7urv8d
* Set up IAM user **demo-s3-user** and update this user's **accessKeyAWS** and **secretKeyAWS** in application. How to do it you have described here: https://docs.google.com/document/d/1MgS-062m6b3OUuYI2c-niROBXruL_dHpeSmmbwadJ40/edit#heading=h.x5ouo7urv8d
* Create some test file to upload in location **C://tmp/demo.txt**
* (Optional) Add **S3** library using following script id: **1Qx-smYQLJ2B6ae7Pncbf_8QdFaNm0f-br4pbDg0DXsJ9mZJPdFcIEkw_**
  

LAUNCH
------

To launch project please:
* Open Gsheet;
* Choose "S3 Functions -> Import Data from S3;
* Choose "S3 Functions -> Export Data to S3;
* Choose "S3 Functions -> Create Bucket "wisniewskikr-tmp";
* Choose "S3 Functions -> Delete Bucket "wisniewskikr-tmp";
* Choose "S3 Functions -> Create Folder "tmp" with file;
* Choose "S3 Functions -> Delete Folder "tmp" with file;
* (Optional) Sometimes you will be asked to confirm permissions.


DOCUMENTATION
-------------

External library has to be used here: https://engetc.com/projects/amazon-s3-api-binding-for-google-apps-script/