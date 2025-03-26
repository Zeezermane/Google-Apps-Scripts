/**
 * Wipes a mobile device using a direct API call with UrlFetchApp.
 *
 * @param {string} deviceId - The resource ID of the mobile device to wipe.
 */
function wipeEmployeeDevice(deviceId) {
  var email = "";
  var customerId = 'my_customer'; // Replace with your customer ID or use 'my_customer'

  var device = AdminDirectory.Mobiledevices.get('my_customer', deviceId);
Logger.log("Device ID: " + device);

var response = AdminDirectory.Mobiledevices.list('my_customer', { query: 'email:' + email });
if (response.mobiledevices && response.mobiledevices.length > 0) {
  var firstDevice = response.mobiledevices[0];
  var deviceId = firstDevice.deviceId;
  Logger.log("Device ID: " + deviceId);
}

var resourceId = response.mobiledevices[0].resourceId;
Logger.log("Resource ID: " + resourceId);

  // Construct the endpoint URL
  var url = "https://admin.googleapis.com/admin/directory/v1/customer/" +
            customerId +
            "/mobiledevices/" +
            deviceId +
            "/wipe";
  
  // Define the wipe request payload.
  var wipeRequest = {
    wipeUser: true,        // Wipe user data from the device.
    removeResetLock: true  // Remove any reset lock on the device.
  };
  
  // Options for the POST request.
  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      // Use the script's OAuth token for authorization.
      Authorization: "Bearer " + ScriptApp.getOAuthToken()
    },
    payload: JSON.stringify(wipeRequest),
    muteHttpExceptions: true  // Allows you to see error responses in the log.
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("Response Code: " + response.getResponseCode());
    Logger.log("Response: " + response.getContentText());
  } catch (error) {
    Logger.log("Error wiping device: " + error.message);
  }
}

/**
 * Example function to list devices for an employee and wipe one device.
 */
function testDeviceWipe() {
  var employeeEmail = 'employee@example.com';  // Replace with the employee's email
  
  // List devices using the AdminDirectory advanced service.
  // Ensure you've enabled the Admin SDK Directory API in your Apps Script project.
  var customerId = 'my_customer';
  var optionalArgs = { query: 'email:' + employeeEmail };
  
  try {
    var response = AdminDirectory.Mobiledevices.list(customerId, optionalArgs);
    var devices = response.mobiledevices;
    
    if (devices && devices.length > 0) {
      // For example, take the first device found.
      var deviceId = devices[0].resourceId;
      Logger.log('Wiping device with resource ID: ' + deviceId);
      wipeEmployeeDevice(deviceId);
    } else {
      Logger.log('No devices found for ' + employeeEmail);
    }
  } catch (error) {
    Logger.log("Error listing devices: " + error.message);
  }


  
 
}
