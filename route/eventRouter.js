const express = require("express");
const router = express.Router();
const createEvent = require("../server/googleCalendar.js")
// const { check, validationResult} = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

const event = require('../server/schemaEvent.js')

router.get('/', (req, res) => {
    res.send('Welcome to the api!')
})

router.get('/getAll', async (req, res) => {
    try {
        const e = await event.find({});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

//create event, only start and end are required
//look at schemaEvent for required syntax
router.post('/add', async (req, res) => {
    try {
        let curEvent = new event({
            summary: req.body.summary,
            location: req.body.summary,
            start: req.body.start,
            end: req.body.end,
            recurrence: req.body.recurrence,
            attendees: req.body.attendees,
            reminders: req.body.reminders
        })
        await curEvent.save();
        res.json(curEvent);
    } catch(err) {
        res.send(err.message);
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        let curEvent = await event.findById(req.params.id);
        delete curEvent['_id']
        delete curEvent['__v']
        console.log(curEvent)
        console.log(createEvent);
        createEvent(curEvent);
        res.json(curEvent);
    } catch(err) {
        res.send(err.message)
    }
})

module.exports = router;