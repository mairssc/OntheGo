const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");


router.post("/post", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const post = req.body.post;
        user.posts.push(post);

        await user.save();

        res.json({ posts: user.posts});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.delete("/delete", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const index = req.body.postIndex;
        if (index > -1) {
            user.posts.splice(index, 1);
        }

        await user.save();

        res.json({ posts: user.posts});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.get("/all", async (req, res) => {
    try {
        const promise = new Promise((resolve, reject) => {
            User.find().then((users) => {
                allPosts = []
                users.forEach(element => {
                    element.posts.forEach(post => {
                        allPosts.push({name: element.name, post: post})
                    })
                })
                resolve(allPosts)
            })
        })
        promise.then((allPosts) => res.json({posts: allPosts}))
    } catch (e) {
        res.send({message : "Error in Fetching User"});
    }
})

module.exports = router;