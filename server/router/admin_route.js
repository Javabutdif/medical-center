const express = require("express");
const Admin = require("../model/admin_model");
const User = require("../model/user_model");
const Image = require("../model/imaging_model");
const authenticateToken = require("../authentication/authenticateToken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const { sendNotification } = require("../mail/mail_content");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/admin/get-all-patients", authenticateToken, async (req, res) => {
  try {
    const patients = await User.find();
    res.status(200).json({ data: patients });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update-patients
router.put("/admin/update-patients", authenticateToken, async (req, res) => {
  const { patient_id, email, mobile_number } = req.body;

  console.log(mobile_number);

  try {
    const updatedPatient = await User.updateOne(
      { patient_id },
      {
        $set: {
          email: email,
          mobile_number: mobile_number,
        },
      }
    );
    if (updatedPatient.modifiedCount > 0) {
      res.status(200).json({ message: "Patient updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//delete-patient
router.delete(
  "/admin/delete-patient/:patient_id",
  authenticateToken,
  async (req, res) => {
    const { patient_id } = req.params;

    try {
      const deletePatient = await User.deleteOne({ patient_id });

      if (deletePatient.modifiedCount > 0) {
        res.status(200).json({ message: "Patient deleted successfully" });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

router.post(
  "/admin/upload-data/:id",
  upload.single("selectedImage"),
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;
    const { examDescription, sectionType } = req.body;
    try {
      const uploadImageData = new Image({
        patient_id: id,
        image: path,
        examDescription,
        sectionType,
        examDate: Date.now(),
      });
      uploadImageData.save();

      const patient_data = await User.findOne({ patient_id: id });

      if (uploadImageData && patient_data) {
        await sendNotification(
          patient_data.email,
          patient_data.firstname,
          patient_data.lastname
        );
        res.status(200).json({ message: "Image uploaded successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/admin/get-all-special-imaging",
  authenticateToken,
  async (req, res) => {
    try {
      const specialImaging = await Image.find({
        sectionType: "Special Imaging",
      });
      res.status(200).json({ data: specialImaging });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/admin/get-all-laboratory", authenticateToken, async (req, res) => {
  try {
    const laboratory = await Image.find({
      sectionType: "Laboratory",
    });
    console.log(laboratory);
    res.status(200).json({ data: laboratory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
