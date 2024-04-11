// Important Libraries
const express = require("express");
const app = express();
const path = require("path");
const DataDome = require("@datadome/node-module");
const dotenv = require("dotenv");
require("dotenv").config();
const datadomeClient = new DataDome(process.env.DDKEY, "api.datadome.co", {
  timeout: 200,
  uriRegexExclusion:
    /\.(js|css|jpg|jpeg|png|ico|gif|tiff|svg|woff|woff2|ttf|eot|mp4|otf)$/,
});

// DataDome install
app.use(function (req, resp, next) {
  datadomeClient.authCallback(
    req,
    resp,
    function () {
      next();
    },
    function () {}
  );
});

// Open array for user storage
const users = [];

// Use all static assets in public folder
app.use(express.static(path.join(__dirname, "public")));

// Use middleware to get input payloads
app.use(express.urlencoded({ extended: false }));

// Start Routes
app.post("/register", async (req, res) => {
  try {
    users.push({
      id: Date.now().toString(),
      firstNme: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(users);
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

app.get("/index", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/index.ejs"));
});

app.get("/login", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/login.ejs"));
});

app.get("/register", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/register.ejs"));
});

// End Routes

app.listen(3002);
