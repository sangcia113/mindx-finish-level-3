const inventoryService = require('../services/inventoryService');

const getAllProducts = async (req, res) => {
    try {
        const products = await inventoryService.getAllProducts(req.query.lowQuantity);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllProducts };
