const mongoose = require('mongoose');

const stockInSchema = new mongoose.Schema({
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const StockIn = mongoose.model('StockIn', stockInSchema, 'stock_ins');

module.exports = StockIn;
