const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now, required: true },
    updatedDate: { type: Date, default: null },
});

const Department = mongoose.model('Department', departmentSchema, 'departments');

module.exports = Department;
