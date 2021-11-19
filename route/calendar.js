const express = require("express");
const router = express.Router();
const {createCalendarEvent, getAuthUrl} = require("../server/googleCalendar.js")
// const { check, validationResult} = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");



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

//put in query with code from website query, do not call if no code
router.get('/get/:id', async (req, res) => {
    try {
        let curCalendar = await calendar.findById(req.params.id);
        
        
        //ADD AUTH HANDELING, should be required in order to do anything
        //currently code, would be better if we had token, or some way of storing token
        //code shou
        let code = req.query.code
        

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
        createCalendarEvent(curCalendar, code);
        res.send(curCalendar)
    } catch(err) {
        res.send(err.message)
    }
})

//call this when they want to make calendar event
//this sends them back to home page with code, err, and scope in query
router.get('/getAuthUrl' , async (req, res) => {
    res.send(getAuthUrl());
})

module.exports = router;