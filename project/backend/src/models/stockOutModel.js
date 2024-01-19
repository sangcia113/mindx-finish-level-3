const mongoose = require('mongoose');

const stockOutSchema = new mongoose.Schema({
    stockInId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockIn', required: true },
    quantity: { type: Number, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const StockOut = mongoose.model('StockOut', stockOutSchema, 'stock_outs');

module.exports = StockOut;
