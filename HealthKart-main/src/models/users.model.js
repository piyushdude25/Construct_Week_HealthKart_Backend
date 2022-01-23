const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, rquired: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
},{
    versionKey: false,
    timeStamps: true,
});

const User = mongoose.model("user", userSchema);
module.exports = User;