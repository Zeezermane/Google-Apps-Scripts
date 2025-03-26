// Mail delagation must be turned ON

function  delegateAccountAccess(sharedEmail, supervisorEmail) {

  var sharedEmail = ""
  var supervisorEmail = "";
    var delegate = {
    delegate: supervisorEmail
    // Additional settings can be added here.
  };
  // Insert the delegate using the Gmail API.
  try {
    // Use the "create" method instead of "insert"
    var response = Gmail.Users.Settings.Delegates.create(delegate, sharedEmail);
    Logger.log('Delegation successful: ' + JSON.stringify(response));
  } catch (e) {
    Logger.log('Error delegating access: ' + e.toString());
  }
  
}
