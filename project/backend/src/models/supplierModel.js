const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    numberPhone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Supplier = mongoose.model('Supplier', supplierSchema, 'suppliers');

module.exports = Supplier;
