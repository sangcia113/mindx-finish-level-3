const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    sku: { type: String, required: true },
    description: { type: String, required: true },
    instock: { type: Number, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
