function onInitDialogFirst_() {

  // throw new Error("Test Error First");
  // wait(5000);

  var response = {
    "message": "Hello World First"
  }

  return JSON.stringify(response);
   
}

function onInitDialogSecond_() {

  // throw new Error("Test Error Second");
  // wait(5000);

  var response = {
    "message": "Hello World Second"
  }

  return JSON.stringify(response);
   
}