const express = require("express");
const router = express.Router();
const path = require('path');

const calendar = require('../models/calendar.js');
const room = require('../models/room.js');

router.get('/', (req, res) => {
    //whichever file we use for room data
    console.log(__dirname);
    if (req.query.name){
        //room
        res.sendFile(path.join(__dirname, '../../client/room.html'));
        return
    } 
    res.sendFile(path.join(__dirname, '../../client/name.html'));
})

module.exports = router;