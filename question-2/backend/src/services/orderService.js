const Order = require('../models/orderModel');

const orderService = {
    getAll: async () => {
        try {
            const orders = await Order.find();

            return orders;
        } catch (error) {
            return { error: error.message };
        }
    },

    getLimit: async id => {
        try {
            const orders = await Order.findById(id);

            return orders;
        } catch (error) {
            return { error: error.message };
        }
    },
};

module.exports = orderService;
