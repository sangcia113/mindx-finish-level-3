// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
