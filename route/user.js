const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");


const User = require("../models/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/login",
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

    const {
      name,
      url
    } = req.body;
    try {
      let user = await User.findOne({
        name,
        url
      });
      if (user) {
        console.log("user found!!!")
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
            return;
          })
      }

      user = new User({
        name,
        url
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

/**
* @method - GET
* @description - Get LoggedIn User
* @param - /user/me
*/


router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

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
