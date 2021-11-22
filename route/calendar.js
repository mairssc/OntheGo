const express = require("express");
const router = express.Router();
const {createCalendarEvent, getAuthUrl} = require("../server/googleCalendar.js");
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
        let curCalendar = await calendar.findOne({
            summary: req.body.summary,
            start: req.body.start,
            end: req.body.end
        });
        if (curCalendar) {
            return res.status(400).json({
                message: "Calendar Event Already Exists"
            });
        }
        curCalendar = new calendar({
            summary: req.body.summary,
            location: req.body.summary,
            start: req.body.start,
            end: req.body.end,
            recurrence: req.body.recurrence,
            attendees: req.body.attendees,
            reminders: req.body.reminders
        })
        await curCalendar.save();
        res.json(curCalendar);
    } catch(err) {
        res.send(err.message);
    }
})

//give id for calendar and token json from /getToken
router.get('/get/:id', async (req, res) => {
    try {
        let curCalendar = await calendar.findById(req.params.id);
        
        
        //ADD AUTH HANDELING, should be required in order to do anything
        //currently code, would be better if we had token, or some way of storing token
        //code shou
        let curoAuth2Client = oAuth2Client;
        let token = req.body;
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
router.get('/getAuthUrl' , async (req, res) => {
    res.send(getAuthUrl());
})


//Enter code, return token json file
router.get('/getToken', async (req, res) => {
    try {
        let code = req.query.code;
        let curoAuth2Client = oAuth2Client;
        curoAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            res.send(token);
        });
    } catch(err) {
        res.send(err.message);
    }  
})

module.exports = router;