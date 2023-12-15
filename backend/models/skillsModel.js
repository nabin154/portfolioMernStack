const mongoose = require("mongoose");
const skillsSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  category: { type: String, required: true },
  iconLink: { type: String, required: true },
  percentage: { type: String, required: true },
});

const Skills = new mongoose.model("Skills", skillsSchema);
module.exports = Skills;
