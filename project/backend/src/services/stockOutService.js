const StockOut = require('../models/stockOutModel');

const stockOutService = {
    createStockOut: async stockOutData => await new StockOut(stockOutData).save(),

    readAllStockOut: async () => await StockOut.find(),

    readStockOutById: async id => await StockOut.findById(id),

    updateStockOut: async (id, stockOutData) => {
        stockOutData.updatedDate = new Date();

        await StockOut.findByIdAndUpdate(id, stockOutData, { new: true });
    },

    deleteStockOut: async id => await StockOut.findByIdAndDelete(id),
};

module.exports = stockOutService;
