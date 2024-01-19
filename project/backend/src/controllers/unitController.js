const {
    createUnit,
    readAllUnit,
    readUnitById,
    updateUnit,
    deleteUnit,
} = require('../services/unitService');

const unitController = {
    createUnit: async (req, res) => {
        try {
            const unitData = req.body;

            await createUnit(unitData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllUnit: async (req, res) => {
        try {
            const response = await readAllUnit();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readUnitById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUnitById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateUnit: async (req, res) => {
        try {
            const { id } = req.params;

            const unitData = req.body;

            await updateUnit(id, unitData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteUnit: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteUnit(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = unitController;
