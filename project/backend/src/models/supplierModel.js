const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    numberPhone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Supplier = mongoose.model('Supplier', supplierSchema, 'suppliers');

module.exports = Supplier;
