const express = require("express");
const Admin = require("../model/admin_model");
const User = require("../model/user_model");
const Image = require("../model/imaging_model");
const authenticateToken = require("../authentication/authenticateToken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const router = express.Router();

router.get("/user/get-all-medical/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const laboratory = await Image.find({
      patient_id: id,
    });
    console.log(laboratory);
    res.status(200).json({ data: laboratory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//user/get-specific-data

router.get(
  "/user/get-specific-data/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.find({
        patient_id: id,
      });
      console.log(user);
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
//user/update-data

router.put("/user/update-data", async (req, res) => {
  const {
    patientNo,
    firstName,
    middleName,
    lastName,
    suffix,
    gender,
    emergencyContact,
    dob,
    address,
    email,
    country,
    state,
    postalCode,
    mobile_number,
  } = req.body;

  try {
    await User.updateOne(
      { patient_id: patientNo },
      {
        firstName,
        middleName,
        lastName,
        suffix,
        gender,
        emergencyContact,
        dob,
        address,
        email,
        country,
        state,
        postalCode,
        mobile_number,
      }
    );

    res.status(200).json({ message: "Update Profile successful" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: error });
    } else {
      console.error({ message: "Error updating user:", error });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.put("/user/update-tour", async (req, res) => {
  const { id, type } = req.body;
  try {
    const user =
      type === "patient"
        ? await User.updateOne(
            {
              patient_id: id,
            },
            { $set: { hasSeenTour: true } }
          )
        : await Admin.updateOne(
            {
              name: id,
            },
            { $set: { hasSeenTour: true } }
          );
    console.log(user);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
