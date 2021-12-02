const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


const router = express.Router();

const calendar = require('../models/calendar.js');
const Room = require('../models/room.js');

router.get('/', (req, res) => {
    res.send('Welcome to room api!')
})


router.get('/get', async (req, res) => {
    try {
        const e = await Room.findOne({token: req.query.token});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const room = await Room.find();
        //const room = await Room.findOne({token: req.body.token});
        res.json(room);
    } catch(err) {
        res.send(err.message);
    }
})

router.post('/add', async (req, res) => {
    try {
        const payload = {}
        jwt.sign(payload, "randomString", {expiresIn: 1000000000}, async (err, token) => {
            if (err) throw err;
            room = new Room({calendar: req.body.calendar,
                             token: token})
            room.save();
            res.json(room);
          });
       
    } catch(err) {
        res.send(err.message);
    }
})

router.post('/description', async (req, res) => {
    try {
        const room = await Room.findOne({token: req.query.token});
        console.log(room.description)
        room.description = req.body.description
        await room.save();
        res.json(room);
    } catch(err) {
        res.send(err.message);
    }
})

router.get('/description', async (req, res) => {
    try {
        const room = await Room.findOne({token: req.query.token});
        res.json({description: room.description});
    } catch(err) {
        res.send(err.message);
    }
})



module.exports = router;