const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Role = mongoose.model('Role', roleSchema, 'roles');

module.exports = Role;
