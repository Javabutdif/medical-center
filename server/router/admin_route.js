const express = require("express");
const Admin = require("../model/admin_model");
const User = require("../model/user_model");
const authenticateToken = require("../authentication/authenticateToken");
require("dotenv").config();

const router = express.Router();

router.get("/admin/get-all-patients", authenticateToken, async (req, res) => {
	try {
		const patients = await User.find();
		res.status(200).json({ data: patients });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
