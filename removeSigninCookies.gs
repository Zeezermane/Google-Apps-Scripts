function removeSigninCookies(email) {
  var email = ""; // Enter the users email
  var user = AdminDirectory.Users.get(email);
  user.orgUnitPath = "/Offboarding"; // Adjust the OU path as needed.
  AdminDirectory.Users.update(user, email);
  
  // Signs out the user
  AdminDirectory.Users.signOut(email);
  Logger.log('User moved to Offboarding and signed out: ' + email);
}
