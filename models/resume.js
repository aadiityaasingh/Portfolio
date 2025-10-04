const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  filename: String,
  filepath: String,
  uploadedAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume",resumeSchema)
module.exports = Resume;
