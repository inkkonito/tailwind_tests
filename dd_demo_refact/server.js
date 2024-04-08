// Important Libraries
const express = require("express");
const app = express();
const path = require("path");
const DataDome = require("@datadome/node-module");
const dotenv = require("dotenv");
const datadomeClient = new DataDome(process.env.DDKEY, "api.datadome.co");

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
    res.send("SUCCES");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

app.get("/login.ejs", (req, res) => {
  res.render("login.ejs");
});

app.get("/register.ejs", (req, res) => {
  res.render("register.ejs");
});
// End Routes

// DataDome install

app.use(function (req, resp, next) {
  datadomeClient.authCallback(
    req,
    resp,
    function () {
      // apiserver passed request, move forward
      next();
    },
    function () {
      // nothing to do when blocked
    }
  );
});
app.listen(3000);
