const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateRandom = require("../tools/generateRandom");
const token_key = process.env.JWT_SECRET;
const { sendMail } = require("../mail/mail_content");

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
      patient_id: generateRandom(),
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
    console.log(newUser);
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

router.post("/get-otp", async (req, res) => {
  const { email, firstname, lastname } = req.body;

  try {
    const response = await sendMail(email, firstname, lastname);
    console.log(response);
    res.status(200).json({ data: response, message: "Sending OTP to email" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
