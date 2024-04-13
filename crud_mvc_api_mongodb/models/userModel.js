const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter a first name"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter a first name"],
        },
        email: {
            type: String,
            required: [true, "Please enter a first name"],
        },
        password: {
            type: String,
            required: [true, "Please enter a first name"],
        }
    },
    {
        timestamp: true,
    }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;