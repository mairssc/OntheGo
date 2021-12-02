const express = require("express");
const router = express.Router();

const Room = require("../models/room.js");
const Purchase = require('../models/purchase.js');

router.get('/', (req, res) => {
    res.send('Welcome to purchase api!')
})

router.get('/getAll', async (req, res) => {
    try {
        const e = await Purchase.find({});
        res.json(e);
    } catch(err) {
        res.send(err.message);
    }
})

router.post('/add', async (req, res) => {
    try {
    	const name =  req.query.name
    	const token = req.query.token
        const room = await Room.findOne({token: token});
        const newPurchase = new Purchase({
            purchaseName: req.body.purchaseName,
            purchaser: name,
            price: req.body.price,
            owe: req.body.owe
        })
        console.log(newPurchase)
        room.purchases.push(newPurchase)

        await room.save();

        await res.json({ purchases: room.purchases});
    } catch (e) {
        res.send({ message: e.message});
    }
})

router.delete("/delete", async (req, res) => {
    try {
    	const token = req.query.token;
        const room = await Room.findOne({token: token});
        const index = req.body.purchaseIndex;
        if (index > -1) {
            room.purchases.splice(index, 1);
        }

        await room.save();

        res.json({ purchases: room.purchases});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.get("/all", async (req, res) => {
    try {
        const token = req.query.token;
        const room = await Room.findOne({token: token});
        res.json({purchases: room.purchases})
    } catch (e) {
        res.send({message : "Error in Fetching User"});
    }
})

module.exports = router;