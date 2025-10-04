const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Information = require("./models/contact.js");
const Resume = require("./models/resume.js")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

MONGO_URL1 = "mongodb://127.0.0.1:27017/resumedb";

main1()
  .then(() => {
    console.log("connected to res database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main1() {
  await mongoose.connect(MONGO_URL1);
}

//home route
app.get("/", async (req, res) => {
  res.render("home.ejs");
});


app.get("/about", async (req, res) => {
  res.render("about.ejs");
});


app.get("/projects", async (req, res) => {
  res.render("projects.ejs");
});


app.get("/skills", async (req, res) => {
  res.render("skills.ejs");
});


app.get("/contact", async (req, res) => {
  res.render("contact.ejs");
});

app.post("/home", async (req, res) => {
  const newInformation = new Information(req.body.contact);
  await newInformation.save();
  res.redirect("/home")
});

app.get("/resume", async (req, res) => {
  const resume = await Resume.findOne().sort({ uploadedAt: -1 });
  if (!resume) return res.status(404).send("No resume found");
  res.sendFile(path.resolve(resume.filepath));
  // res.redirect("/home")
});

// const skills = [
//   { name: 'HTML', logo: '/images/html.png', level: 90 },
//   { name: 'CSS', logo: '/images/css.png', level: 85 },
//   { name: 'JavaScript', logo: '/images/js.png', level: 80 },
//   { name: 'Node.js', logo: '/images/node.png', level: 75 },
//   { name: 'MongoDB', logo: '/images/mongo.png', level: 70 }
// ];

// app.get('/', (req, res) => {
//   res.render('skills', { skills });
// });

app.listen(8080, () => {
  console.log("server is running");
});
