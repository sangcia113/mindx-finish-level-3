const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Department = mongoose.model('Department', departmentSchema, 'departments');

module.exports = Department;
