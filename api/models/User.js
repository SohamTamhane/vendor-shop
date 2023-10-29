const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address1 : {
        type: String
    },
    address2 : {
        type: String
    },
    city : {
        type: String
    },
    state : {
        type: String
    },
    pincode : {
        type: Number
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Labour"]
    },
    orders: {
        type: Array
    }
})

module.exports = mongoose.model("User", userSchema);