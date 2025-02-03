const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	patient_id: {
		type: String,
		unique: true,
	},
	username: {
		type: String,
	
	},
	firstname: {
		type: String,
		required: true,
	},
	middlename: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	suffix: {
		type: String,
	},
	gender: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	mobile_number: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
