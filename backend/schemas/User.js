const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

let UserSchema = mongoose.model("fulluser", Users);
module.exports = UserSchema
