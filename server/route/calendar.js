const express = require("express");
const router = express.Router();
const {createCalendarEvent, getAuthUrl} = require("../googleCalendar.js");
const {google} = require('googleapis');
const clientInfo = require('../clientInfo.json');
// const { check, validationResult} = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

const clientId = clientInfo.clientId;
const clientSecret = clientInfo.clientSecret;
//RedirectUri sends after authenticated
//This should redirect after user authenticates
const redirectUris = ["urn:ietf:wg:oauth:2.0:oob","http://localhost:8080"];
const oAuth2Client = new google.auth.OAuth2(
  clientId, clientSecret, redirectUris[1]);

const calendar = require('../models/calendar.js');
const Room = require('../models/room.js')

router.get('/', (req, res) => {
    res.send('Welcome to the api!')
})

router.get('/getAll', async (req, res) => {
    try {
        const e = await calendar.find({});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

//create calendar, only start and end are required
//look at schemacalendar for required syntax
router.post('/add', async (req, res) => {
    try {
    	const token = req.query.token
        const room = await Room.findOne({token: token});
        const c = req.body.calendar;
        const newCalendar = new calendar({
            summary: c.summary,
            location: c.location,
            start: c.start,
            end: c.end,
            recurrence: c.recurrence,
            attendees: c.attendees,
            reminders: c.reminders
        })
        console.log(newCalendar)
        room.calendar = newCalendar;

        await room.save();

        await res.json({ calendar: room.calendar});
    } catch (e) {
        res.send({ message: e.message});
    }
})

//give id for calendar and token json from /getToken
//takes in uri
router.post('/get', async (req, res) => {
    try {
        let c = await Room.findOne({token: req.query.roomToken});
        let curCalendar = c.calendar
        let uri = req.query.uri;
        
        
        //ADD AUTH HANDELING, should be required in order to do anything
        //currently code, would be better if we had token, or some way of storing token
        //code shou
        let curoAuth2Client = new google.auth.OAuth2(
            clientId, clientSecret, uri);
        let token = req.body.token;
        curoAuth2Client.setCredentials(token);

        curCalendar = {
            summary: curCalendar.summary,
            location: curCalendar.summary,
            start: curCalendar.start,
            end: curCalendar.end,
            recurrence: curCalendar.recurrence,
            attendees: curCalendar.attendees,
            reminders: curCalendar.reminders
        }
        //Uses googleCalendar.js to create calendar event and ask for authentication
        //Additionally, sends link to calendar, assuming they are signed onto chrome
        createCalendarEvent(curCalendar, curoAuth2Client, res);
    } catch(err) {
        res.send(err.message);
    }
})

//call this when they want to make calendar event
//this sends them back to home page with code, err, and scope in query
//send uri as query
router.get('/getAuthUrl' , async (req, res) => {
    res.send({url: getAuthUrl(req.query.uri)});
})


//Enter code, return token json file
router.get('/getToken', async (req, res) => {
    try {
        let code = req.query.code;
        let uri = req.query.uri;
        let curoAuth2Client = new google.auth.OAuth2(
            clientId, clientSecret, uri);
        console.log(curoAuth2Client)
        curoAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            res.send(token);
        });
    } catch(err) {
        res.send(err.message);
    }  
})

module.exports = router;