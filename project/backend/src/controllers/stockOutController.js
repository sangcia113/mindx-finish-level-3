const {
    createStockOut,
    readAllStockOut,
    readStockOutById,
    updateStockOut,
    deleteStockOut,
} = require('../services/stockOutService');

const stockOutController = {
    createStockOut: async (req, res) => {
        try {
            const stockOutData = req.body;

            await createStockOut(stockOutData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllStockOut: async (req, res) => {
        try {
            const response = await readAllStockOut();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readStockOutById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readStockOutById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateStockOut: async (req, res) => {
        try {
            const { id } = req.params;

            const stockOutData = req.body;

            await updateStockOut(id, stockOutData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteStockOut: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteStockOut(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = stockOutController;
