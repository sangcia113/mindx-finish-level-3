const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: true },
    numberPhone: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    superiorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
