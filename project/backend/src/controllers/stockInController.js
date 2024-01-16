const {
    createStockIn,
    readAllStockIn,
    readStockInById,
    updateStockIn,
    deleteStockIn,
} = require('../services/stockInService');

const stockInController = {
    createStockIn: async (req, res) => {
        try {
            const stockInData = req.body;

            const response = await createStockIn(stockInData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllStockIn: async (req, res) => {
        try {
            const response = await readAllStockIn();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readStockInById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readStockInById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateStockIn: async (req, res) => {
        try {
            const { id } = req.params;

            const stockInData = req.body;

            const response = await updateStockIn(id, stockInData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteStockIn: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteStockIn(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = stockInController;
