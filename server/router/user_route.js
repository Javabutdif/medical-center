const express = require("express");
const Admin = require("../model/admin_model");
const User = require("../model/user_model");
const Image = require("../model/imaging_model");
const authenticateToken = require("../authentication/authenticateToken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const router = express.Router();


router.get(
	"/user/get-all-medical/:id",
	authenticateToken,
	async (req, res) => {
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
	}
);

module.exports = router;



