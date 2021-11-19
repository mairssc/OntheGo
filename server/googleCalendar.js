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
//RedirectUri sends after authenticated
//This should redirect after user authenticates
const redirectUris = ["urn:ietf:wg:oauth:2.0:oob","http://localhost:8080"];
const oAuth2Client = new google.auth.OAuth2(
  clientId, clientSecret, redirectUris[1]);


//Sends user to authUrl
function getAuthUrl() {
  console.log(redirectUris[1])
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return authUrl
}

function createCalendarEvent(event, auth) {
  // Load client secrets from a local file.
  // Authorize a client with credentials.
  // We want to generate an event under eventGlobal, maybe this could be passed in the body
  // of a request in our rest api  
  authorize(event, auth, addEvent);
}

// function getToken(code) {
//   const oAuth2Client = new google.auth.OAuth2(
//     clientId, clientSecret, redirectUris[1]);
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       console.log(token)
//     });
// }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 */
function authorize(event, auth, callback) {
    // code = String(code);
    // let curoAuth2Client = oAuth2Client;
    // curoAuth2Client.getToken(code, (err, token) => {
    //   if (err) return console.error('Error retrieving access token', err);
    //   curoAuth2Client.setCredentials(token);
    //   // Store the token to disk for later program executions
    //   //calls addEvent
      
    // });
    callback(event, auth);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
// function getAccessToken(oAuth2Client, event, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   //sends authUrl on console
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   //Going to need to change this eventually
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       //calls addEvent
//       callback(event, oAuth2Client);
//     });
//   });
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 */
function addEvent(event, auth) {
  console.log(auth)
  console.log('made it to addEvent')
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
    return event.data.htmlLink
  });
}

//Going to add more later
module.exports = {createCalendarEvent, getAuthUrl};