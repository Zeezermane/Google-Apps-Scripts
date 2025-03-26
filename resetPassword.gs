function resetPassword(email) {
  var email = "";  // here you would add the email of the user that you would like to reset
  var user = AdminDirectory.Users.get(email);
  user.changePasswordAtNextLogin = true;
  AdminDirectory.Users.update(user, email);
  Logger.log('Password reset and force change set for: ' + email);
  }
