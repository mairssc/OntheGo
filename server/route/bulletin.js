const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");


const Room = require("../models/room")
const Post = require("../models/post")

router.post("/post", async (req, res) => {
    try {
    	const name =  req.query.name
    	const token = req.query.token
        const room = await Room.findOne({token: token});
        const post = req.body.post;
        const newPost = new Post({post: post,
                                    poster: name})
        console.log(newPost)
        room.posts.push(newPost)

        await room.save();

        res.json({ posts: room.posts});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.delete("/delete", async (req, res) => {
    try {
    	const token = req.query.token;
        const room = await Room.findOne({token: token});
        const index = req.body.postIndex;
        console.log("333")
        if (index > -1) {
            room.posts.splice(index, 1);
        }

        await room.save();

        res.json({ posts: room.posts});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.get("/all", async (req, res) => {
    try {
        const token = req.query.token;
        const room = await Room.findOne({token: token});
        res.json({posts: room.posts})
    } catch (e) {
        res.send({message : "Error in Fetching User"});
    }
})

module.exports = router;