const { error } = require("console");
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const userRoute = require("./routes/userRoute");
app.use(express.json());

// User Route
app.use("/api", userRoute);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("connected to MongoDB Atlas");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });