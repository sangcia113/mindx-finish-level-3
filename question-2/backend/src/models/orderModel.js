// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
