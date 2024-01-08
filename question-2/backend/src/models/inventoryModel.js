// models/inventoryModel.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instock: {
        type: Number,
        required: true,
    },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
