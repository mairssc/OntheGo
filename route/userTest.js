const express = require("express");
const router = express.Router();

const userTest = require('../models/userTest.js');

router.get('/', (req, res) => {
    res.send('Welcome to userTest api!')
})

router.get('/get/:name', async (req, res) => {
    try {
        let user = await userTest.findOne({
            name: req.params.name
        });
        if (user) {
            res.json(user);
            return;
        }
        res.send('No user with name ' + req.params.name + ' found');
    } catch(err) {
        res.send(err.message);
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const e = await user.find({});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

router.post('/add', async (req, res) => {
    try {
        let user = await userTest.findOne({
            name: req.body.name
        });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }
        user = new userTest({
            name: req.body.name,
            token: req.body.token
        });
        await user.save();
        res.json(user);
    } catch(err) {
        res.send(err.message);
    }
})

module.exports = router;