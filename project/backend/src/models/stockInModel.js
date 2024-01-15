const mongoose = require('mongoose');

const stockInSchema = new mongoose.Schema({
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    importQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const StockIn = mongoose.model('StockIn', stockInSchema, 'stock_ins');

module.exports = StockIn;
