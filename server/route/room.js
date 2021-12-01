const express = require("express");
const router = express.Router();

const calendar = require('../models/calendar.js');
const room = require('../models/room.js');

router.get('/', (req, res) => {
    res.send('Welcome to room api!')
})


router.get('/getAll', async (req, res) => {
    try {
        const e = await room.find({});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

router.get('/get', async (req, res) => {
    try {
        const e = await room.findOne({
            url: req.query.url
        });
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

router.post('/add', async (req, res) => {
    try {
        let r = await room.findOne({
            url: req.body.url
        });
        if (r) {
            return res.status(400).json({
                message: "Room Already Exists"
            });
        }
        r = new room({
            url: req.body.url,
            calendar: req.body.calendar,
            users: req.body.users
        });
        await r.save();
        res.json(r);
    } catch(err) {
        res.send(err.message);
    }
})

module.exports = router;