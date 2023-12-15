const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  githubLink: { type: String, required: true },
  livedemoLink: { type: String, required: true },
  
});

const Project = new mongoose.model("Project", projectSchema);
module.exports = Project;
