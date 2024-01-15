const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Unit = mongoose.model('Unit', unitSchema, 'units');

module.exports = Unit;
