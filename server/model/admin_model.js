const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  hasSeenTour: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema, "admin");

module.exports = Admin;
