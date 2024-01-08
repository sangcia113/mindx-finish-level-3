// controllers/orderController.js
const Order = require('../models/orderModel');
const Inventory = require('../models/inventoryModel');

exports.getOrdersWithProductDescription = async (req, res) => {
    try {
        const orders = await Order.find().populate('item', 'description');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
