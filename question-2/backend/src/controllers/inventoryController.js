const Inventory = require('../models/inventoryModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Inventory.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLowQuantityProducts = async (req, res) => {
    try {
        const lowQuantityProducts = await Inventory.find({ instock: { $lt: 100 } });
        res.json(lowQuantityProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllProducts, getLowQuantityProducts };
