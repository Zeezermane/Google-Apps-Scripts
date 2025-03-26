/**
 *
 * Add the OAuth2 library to your project using the following library key:
 * "1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF"
 * 
 * If the key changes, you can find it here https://github.com/googleworkspace/apps-script-oauth2
 * 
 * Then, replace the placeholder values below with your service account details.
 */

// Replace with your service account email from your JSON key file.
var CLIENT_EMAIL = '';
// Replace with your private key (as it appears in your JSON key file).
var PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n';

/**
 * Returns an OAuth2 service configured for a service account with domain‑wide delegation.
 */
function getService() {
  return OAuth2.createService('ServiceAccount')
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setPrivateKey(PRIVATE_KEY)
    .setIssuer(CLIENT_EMAIL)
    .setPropertyStore(PropertiesService.getScriptProperties())
    // Impersonate the target user.
    .setSubject('') // email of user
    // Set the scopes needed to update Gmail settings.
    .setScope('https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/gmail.settings.sharing');
}

/**
 * Updates the Gmail vacation settings for the impersonated user.
 */
function updateVacationSettings() {
  var service = getService();
  
  if (service.hasAccess()) {
    var url = 'https://gmail.googleapis.com/gmail/v1/users/me/settings/vacation';
    
    // Define the vacation (away) settings.
    var vacationSettings = {
      enableAutoReply: true,
      responseSubject: 'No longer at xxx', //customize message
      responseBodyPlainText: "Hi, I'm no longer with xxx. Your email has been forwarded to my supervisor.",
      startTime: 0,               // Effective immediately
      endTime: 32503680000000     // Far-future date (year 3000)
    };
    
    var options = {
      method: 'put',
      contentType: 'application/json',
      payload: JSON.stringify(vacationSettings),
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      },
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('Vacation settings response code: ' + response.getResponseCode());
    Logger.log('Vacation settings response: ' + response.getContentText());
  } else {
    Logger.log('Service error: ' + service.getLastError());
  }
}

/**
 * Updates the Gmail auto‑forwarding settings for the impersonated user.
 * Note: The forwarding address must already be added and verified in the account's Gmail settings.
 */
function updateAutoForwardingSettings() {
  var service = getService();
  
  if (service.hasAccess()) {
    var url = 'https://gmail.googleapis.com/gmail/v1/users/me/settings/autoForwarding';
    
    // Define the auto‑forwarding settings.
    var autoForwardingSettings = {
      enabled: true,
      emailAddress: '',  // Replace with the verified forwarding address.
      disposition: 'archive'                   // Options: "archive", "leaveInInbox", or "trash"
    };
    
    var options = {
      method: 'put',
      contentType: 'application/json',
      payload: JSON.stringify(autoForwardingSettings),
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      },
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('Auto‑forwarding response code: ' + response.getResponseCode());
    Logger.log('Auto‑forwarding response: ' + response.getContentText());
  } else {
    Logger.log('Service error: ' + service.getLastError());
  }
}

/**
 * Sets both vacation and auto‑forwarding settings.
 */
function setAwayMessage() {
  updateVacationSettings();
  updateAutoForwardingSettings();
}

