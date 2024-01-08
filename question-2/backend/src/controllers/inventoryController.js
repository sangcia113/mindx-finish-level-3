const inventoryService = require('../services/inventoryService');

const inventoryController = {
    getAll: async (req, res) => {
        try {
            const result = await inventoryService.getAll();

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getLimit: async (req, res) => {
        try {
            const result = await inventoryService.getLimit();

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = inventoryController;
