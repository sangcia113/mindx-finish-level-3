const StockIn = require('../models/stockInModel');

const stockInService = {
    createStockIn: async stockInData => await new StockIn(stockInData).save(),

    readAllStockIn: async () => await StockIn.find(),

    readStockInById: async id => await StockIn.findById(id),

    updateStockIn: async (id, stockInData) => {
        stockInData.updatedDate = new Date();

        await StockIn.findByIdAndUpdate(id, stockInData, { new: true });
    },

    deleteStockIn: async id => await StockIn.findByIdAndDelete(id),
};

module.exports = stockInService;
