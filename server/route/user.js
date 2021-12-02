const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");


const Room = require("../models/room");
const Post = require("../models/post")

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/login",
  [
    auth,
    check("name", "Please Enter a Valid Name")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const token = req.body.token;
    try {
      let room = await Room.findOne({
        token
      });
      if (room) {
        console.log("room found!!!")

        const users = room.users
        const {
          name
        } = req.body
        if (await !users.includes(name)) {
          users.push(name);
          console.log(users)
          await room.save();
          res.json(room);
        } else {
          res.json(room)
        }

    }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);


router.get("/all", async (req, res) => {
  try {
    const { url } = req.body;
    const promise = new Promise((resolve, reject) => {
      User.find({ url }).then((users) => {
        allUsers = []
        users.forEach(element => allUsers.push(element))
        resolve(allUsers)
      })
    })
    promise.then((allUsers) => res.json({ users: allUsers }))
  } catch (e) {
    res.send({ message: "Error in Fetching User" });
  }
})

router.delete(
  "/delete",
  [
    check("name", "Please Enter a Valid Name")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name,
      url } = req.body;
    try {
      let user = await User.findOneAndDelete({
        name,
        url
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      res.json({ message: "Successfully deleted User!" })
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

module.exports = router;
