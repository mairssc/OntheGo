const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const clientId = '380499278699-v9v2r3pj2jf56qchhjobrdpgv1ks5ua9.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUris = ["urn:ietf:wg:oauth:2.0:oob","http://localhost"];

function createCalendarEvent(event) {
  // Load client secrets from a local file.
  fs.readFile('../credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials.
  // We want to generate an event under eventGlobal, maybe this could be passed in the body
  // of a request in our rest api
      
  authorize(JSON.parse(content), event, addEvent);
  });
}


//Will be used to retrieve auth url, eventually alter getAccessToken to use respose from getAuthUrl
function getAuthUrl() {
    const oAuth2Client = new google.auth.OAuth2(
      clientId, clientSecret, redirectUris);
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
    return authUrl
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, event, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  console.log(redirect_uris[0])
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
      

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, event, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    // calls addEvent on passed in event and oAuth2Client
    callback(event, oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
function getAccessToken(oAuth2Client, event, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  //sends authUrl on console
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  //Going to need to change this eventually
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      //calls addEvent
      callback(event, oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function addEvent(event, auth) {
  const calendar = google.calendar({version: 'v3', auth: auth});
    calendar.events.insert({    
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      //error
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data.htmlLink);
  });
}

//Going to add more later
module.exports = createCalendarEvent;