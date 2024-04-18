// Important Libraries
const express = require("express");
const app = express();
const path = require("path");
const DataDome = require("@datadome/node-module");
const dotenv = require("dotenv");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

// set the view engine to ejs
app.set("view engine", "ejs");

// DD Config
const datadomeClient = new DataDome(process.env.DDKEY, "api.datadome.co", {
  timeout: 200,
  uriRegexExclusion: /\.(js|css|jpg|jpeg|png|ico|gif|tiff|svg|woff|woff2|ttf|eot|mp4|otf)$/,
});

// DataDome install
app.use(function (req, resp, next) {
  datadomeClient.authCallback(
    req,
    resp,
    function () {
      next();
    },
    function () {},
  );
});

// Use all static assets in public folder
app.use(express.static(path.join(__dirname, "public")));

// Use middleware to get input payloads
app.use(express.urlencoded({ extended: false }));

// SQLITE3 - DB Config
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// SQLITE3 - Create table
db.run(
  "CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName, lastName, email, password)",
  (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  },
);

// DD Account Protect Config
const {
  DataDome: DataDomeAC,
  RegistrationEvent,
  ResponseAction,
} = require("@datadome/fraud-sdk-node");
const datadomeClient2 = new DataDomeAC(process.env.ACCOUNTPROTECTKEY);

// Start Routing Routes

// Post Add Users
app.post("/register", async (req, res) => {
  const startTime = Date.now();
  var emailAccount = req.body.email;
  var session = { id: "sessionId", createdAt: new Date() };

  var userAddress = {
    name: "HQ",
    line1: "22 rue de la Michodiere",
    line2: "2nd floor",
    city: "Paris",
    countryCode: "FR",
    country: "France",
    regionCode: "75",
    zipCode: "75002",
  };

  var user = {
    id: "userId",
    title: "mrs",
    firstName: "Data",
    lastName: "Dome",
    createdAt: new Date(),
    phone: "+33978787878",
    email: emailAccount,
    address: userAddress,
  };

  var registrationEvent = new RegistrationEvent(emailAccount, session, user);

  const datadomeResponse = await datadomeClient2.validate(req, registrationEvent);

  let createLoop = 0;
  console.log(req.body)
  if (datadomeResponse?.action == ResponseAction.ALLOW) {
    if (req.body.createOneUser !== undefined) {
        try {
          db.run("INSERT INTO Users(firstName, lastName, email, password) VALUES(?,?,?,?)", [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
          ]);
          console.log(`User ID : ` + createLoop + ` created`);
        } catch (err) {
          console.error(err.message);
        }
      res.redirect("./register");
    }
   else if (req.body.createTenUsers !== undefined) {
      while (createLoop < 10) {
        try {
          db.run("INSERT INTO Users(firstName, lastName, email, password) VALUES(?,?,?,?)", [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
          ]);
          console.log(`User ID : ` + createLoop + ` created`);
        } catch (err) {
          console.error(err.message);
        }
        createLoop++;
      }
      res.redirect("./register");
    }
    else if (req.body.createHundredUsers !== undefined) {
      while (createLoop < 100) {
        try {
          db.run("INSERT INTO Users(firstName, lastName, email, password) VALUES(?,?,?,?)", [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
          ]);
          console.log(`User ID : ` + createLoop + ` created`);
        } catch (err) {
          console.error(err.message);
        }
        createLoop++;
      }
      res.redirect("./register");
    }
    else if (req.body.createThousandUsers !== undefined) {
      while (createLoop < 1000) {
        try {
          db.run("INSERT INTO Users(firstName, lastName, email, password) VALUES(?,?,?,?)", [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
          ]);
          console.log(`User ID : ` + createLoop + ` created`);
        } catch (err) {
          console.error(err.message);
        }
        createLoop++;
      }
      res.redirect("./register");
    }
  } 
    else {
    res.status(401).send(`Access denied [by DD] ! ${datadomeResponse?.reasons[0]}`);
  }
}); 

// Get Index page
app.get("/index", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/index.ejs"));
});

// Get Login page
app.get("/login", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/login.ejs"));
});

// Get Admin page
app.get("/admin", (req, res) => {
  // Init empty array
  let usersList = [];
  // Select all entries in Users table
  db.all("SELECT * FROM Users ORDER BY firstName", (error, rows) => {
    // receives all the results as an array
    rows.forEach((row) => {
      usersList.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        password: row.password,
      });
      console.log(`User list selected`);
    });
    res.render(path.resolve(__dirname + "/public/views/admin.ejs"), {
      users: usersList,
    });
  });
});

// Get Register page
app.get("/register", (req, res) => {
  res.render(path.resolve(__dirname + "/public/views/register.ejs"));
});

// End
app.listen(3002);
console.clear();
