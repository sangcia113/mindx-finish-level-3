const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Unit = mongoose.model('Unit', unitSchema, 'units');

module.exports = Unit;
