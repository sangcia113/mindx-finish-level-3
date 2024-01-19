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

            await createStockIn(stockInData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllStockIn: async (req, res) => {
        try {
            const response = await readAllStockIn();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readStockInById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readStockInById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateStockIn: async (req, res) => {
        try {
            const { id } = req.params;

            const stockInData = req.body;

            await updateStockIn(id, stockInData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteStockIn: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteStockIn(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = stockInController;
