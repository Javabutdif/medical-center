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
router.delete("/admin/delete-patient/:patient_id", authenticateToken, async (req, res) => {
	const { patient_id } = req.params;

	try {
		const deletePatient = await User.deleteOne({ patient_id });

		if (deletePatient.modifiedCount > 0) {
			res.status(200).json({ message: "Patient deleted successfully" });
		}
	}
	catch(error){
		console.error(error);
	}
});

module.exports = router;



