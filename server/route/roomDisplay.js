const express = require("express");
const router = express.Router();
const path = require('path');

const calendar = require('../models/calendar.js');
const room = require('../models/room.js');

router.get('/', (req, res) => {
    let code = req.query.code;
    res.sendFile(path.join(__dirname, '../../index.html'));
})

module.exports = router;