const StockIn = require('../models/stockInModel');

const stockInService = {
    createStockIn: async stockInData => {
        const stockIn = new StockIn(stockInData);

        return await stockIn.save();
    },

    readAllStockIn: async () => {
        return await StockIn.find();
    },

    readStockInById: async id => {
        return await StockIn.findById(id);
    },

    updateStockIn: async (id, stockInData) => {
        return await StockIn.findByIdAndUpdate(id, stockInData, { new: true });
    },

    deleteStockIn: async id => {
        return await StockIn.findByIdAndDelete(id);
    },
};

module.exports = stockInService;
