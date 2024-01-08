const Inventory = require('../models/inventoryModel');

const inventoryService = {
    getAll: async () => {
        try {
            const products = await Inventory.find();

            return products;
        } catch (error) {
            return { error: error.message };
        }
    },

    getLimit: async () => {
        try {
            const limitProducts = await Inventory.find({ instock: { $lt: 100 } });

            return limitProducts;
        } catch (error) {
            return { error: error.message };
        }
    },
};

module.exports = inventoryService;
