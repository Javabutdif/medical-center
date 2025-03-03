const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../model/admin_model");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const token_key = process.env.JWT_SECRET;
const authenticateToken = require("../authentication/authenticateToken");

const generateToken = (user, role) => {
  return jwt.sign({ ...user, role }, token_key, { expiresIn: "2h" });
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    let user1 = await Admin.findOne({ username });
    let role = "Admin";

    if (!user1) {
      user1 = await User.findOne({ username });
      role = "User";
    }

    if (!user1) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user1.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user =
      role === "Admin"
        ? { name: user1.name, department: user1.department }
        : {
            name: `${user1.firstname} ${user1.middlename} ${user1.lastname}`,
            email: user1.email,
            patient_id: user1.patient_id,
            hasSeenTour: user1.hasSeenTour,
          };

    const token = generateToken(user, role);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user,
      role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

router.get("/protected-route", authenticateToken, async (req, res) => {
  try {
    const user1 = await User.findOne({ patient_id: req.user.patient_id });
    let admin;
    if (!user1) {
      admin = await Admin.findOne({ name: req.user.name });
    }
    
    return res.json({
      message: "Access granted",
      user: req.user,
      role: req.role,
      hasSeenTour: user1?.hasSeenTour || admin?.hasSeenTour,
    });
  } catch (error) {
    console.error("Protected route error:", error);
  }
});

module.exports = router;
