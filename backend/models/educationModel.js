const mongoose = require("mongoose");
const educationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Education = new mongoose.model("Education", educationSchema);
module.exports = Education;
