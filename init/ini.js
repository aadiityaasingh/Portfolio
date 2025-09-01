const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Resume = require("../models/resume.js");
const fs = require("fs");

mongoose.connect("mongodb://127.0.0.1:27017/resumedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

async function uploadResume(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("File does not exist!");
      return;
    }

    // Extract filename
    const filename = path.basename(filePath);

    // Create a new Resume entry
    const newResume = new Resume({
      filename: filename,
      filepath: filePath,
    });

    await newResume.save();
    console.log("✅ Resume uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading resume:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Call function (Pass your file path here)
uploadResume("C:/Users/dell/OneDrive/Desktop/New folder/2/uploads/resume.pdf");