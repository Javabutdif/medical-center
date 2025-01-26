const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const token_key = process.env.JWT_SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    username,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    birthday,
    password,
    email,
    mobile_number,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      middlename: middlename === undefined ? "" : middlename,
      lastname,
      email,
      suffix,
      gender,
      birthday,
      mobile_number,
    });
    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: error });
    } else {
      console.error({ message: "Error saving new user:", error });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

module.exports = router;
