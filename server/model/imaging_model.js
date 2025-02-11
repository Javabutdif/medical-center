const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    patient_id: {
        type: String,
        
    },
    image: {
        type: String,
       
    },
    examDescription: {
        type: String,
       
    },
    sectionType: {
        type: String,
    },


});

const Image = mongoose.model("Image", imageSchema, "image");

module.exports = Image;


