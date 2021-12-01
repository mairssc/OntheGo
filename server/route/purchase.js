const express = require("express");
const router = express.Router();

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
        let p = new Purchase({
            purchaseName: req.body.purchaseName,
            purchaser: req.body.purchaser,
            price: req.body.price,
            owe: req.body.owe
        });
        await p.save();
        res.json(p);
    } catch(err) {
        res.send(err.message);
    }
})

module.exports = router;