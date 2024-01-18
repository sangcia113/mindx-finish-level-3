const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Role = mongoose.model('Role', roleSchema, 'roles');

module.exports = Role;
