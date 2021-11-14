const express = require("express");
const router = express.Router();
// const { check, validationResult} = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

const event = require('../server/schemaEvent.js')

router.get('/', (req, res) => {
    res.send('Welcome to the api!')
})


module.exports = router;