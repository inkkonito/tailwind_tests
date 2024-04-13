const User = require("../models/userModel");

// Create User

const createUser = async(req,res) => {
    try {
        const _user = await User.create(req.body);
        res.status(200).json(_user);
    }
    catch(err) {
console.log(err.message);
res.status(500).json({ message: error.message});
    }
};

module.exports = {
    createUser,
};