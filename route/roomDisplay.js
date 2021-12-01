const express = require("express");
const router = express.Router();
const path = require('path');

const calendar = require('../models/calendar.js');
const room = require('../models/room.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/room.html'));
})

module.exports = router;