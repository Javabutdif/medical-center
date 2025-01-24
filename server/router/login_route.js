const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../model/admin_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const token_key = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user;
  let role;
  try {
    const admin = await Admin.findOne({ username });

    if (admin) {
      const adminPasswordMatch = await bcrypt.compare(password, admin.password);

      if (adminPasswordMatch) {
        user = {
          name: admin.name,
          department: admin.department,
        };
        role = "Admin";
        const token = jwt.sign(user, token_key, {
          expiresIn: "2h",
        });
        res.status(200).json({ message: "Login Successful", token, role });
      } else {
        res.status(500).json({ message: "Invalid Credentials" });
      }
    } else {
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
