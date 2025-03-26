function removeRecoveryInfo(email) {
  var email = "" //enter user email 
  var user = AdminDirectory.Users.get(email);
  // Set recovery info to empty (note: domain policies may affect this).
  user.recoveryEmail = "";
  user.recoveryPhone = "";
  AdminDirectory.Users.update(user, email);
  Logger.log('Recovery info removed for: ' + email);
}
