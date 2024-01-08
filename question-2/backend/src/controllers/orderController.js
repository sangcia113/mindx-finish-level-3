const orderService = require('../services/orderService');

const orderController = {
    getAll: async (req, res) => {
        try {
            const result = await orderService.getAll();

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getLimit: async (req, res) => {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: 'Missing params' });

        try {
            const result = await orderService.getLimit(id);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = orderController;
