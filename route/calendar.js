const express = require("express");
const router = express.Router();
const createCalendarEvent = require("../server/googleCalendar.js")
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

router.get('/get/:id', async (req, res) => {
    try {
        let curCalendar = await calendar.findById(req.params.id);
        delete curCalendar['_id']
        delete curCalendar['__v']
        console.log(curCalendar)
        //Uses googleCalendar.js to create calendar event and ask for authentication
        createCalendarEvent(curCalendar);
        res.json(curCalendar);
    } catch(err) {
        res.send(err.message)
    }
})

module.exports = router;