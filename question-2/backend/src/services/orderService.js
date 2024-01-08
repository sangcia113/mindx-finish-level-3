const Inventory = require('../models/inventory');

const getAllProducts = async lowQuantity => {
    let query = {};
    if (lowQuantity) {
        query = { instock: { $lt: 100 } };
    }

    const products = await Inventory.find(query);
    return products;
};

module.exports = { getAllProducts };
