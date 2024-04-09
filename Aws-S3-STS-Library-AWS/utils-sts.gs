function initStsAWS() {

  var service = getServiceSts();
  var region = getLocationAWS();
  var action = getActionSts();
  var params = {
    "Version": getVersionSts(),
    "RoleSessionName": getRoleSessionNameSts(),
    "RoleArn": getRoleArnSts(),
    "DurationSeconds": getDurationSts()
    };
  var method = "GET";

  return initStsAWSWithReconnection(1, service, region, action, params, method);

}

function initStsAWSWithReconnection(iteration, service, region, action, params, method) {

  Logger.log(`Function %s, Iteration %s, Service %s, Region %s, Action %s, Params %s, Method %s`,
  "initStsAWSWithReconnection()",
  iteration,
  service,
  region,
  action,
  params,
  method);

  var response = null;

  try {

    STS.init(getAccessKey(), getSecretKey());  
    response = STS.request(service, region, action, params, method, "", "", "", "");

  } catch (error) {

    Logger.log('STS connection error. Iteration: %s, Error message: %s', iteration, error);
    if (iteration <= getReconnectionCount()) {
        Utilities.sleep(getReconnectionSleepInMs());
        iteration++;
        initStsAWSWithReconnection(iteration, service, region, action, params, method);
    } else {
      throw error;
    }

  }

  return response.getContentText();

}

function getAccessKeyFromResponse(response) {

  var startIndexAccessKey = response.indexOf("<AccessKeyId>") + 13;
  var stopIndexAccessKey = response.indexOf("</AccessKeyId>");
  return response.substring(startIndexAccessKey, stopIndexAccessKey);

}

function getSecretKeyFromResponse(response) {

  var startIndexSecretKey = response.indexOf("<SecretAccessKey>") + 17;
  var stopIndexSecretKey = response.indexOf("</SecretAccessKey>");
  return response.substring(startIndexSecretKey, stopIndexSecretKey);

}

function getSessionTokenFromResponse(response) {

  var startIndexSessionToken = response.indexOf("<SessionToken>") + 14;
  var stopIndexSessionToken = response.indexOf("</SessionToken>");
  return response.substring(startIndexSessionToken, stopIndexSessionToken);

}
