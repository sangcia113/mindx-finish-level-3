const {
    createDishType,
    readAllDishType,
    readDishTypeById,
    updateDishType,
    deleteDishType,
} = require('../services/dishTypeService');

const dishTypeController = {
    createDishType: async (req, res) => {
        try {
            const dishTypeData = req.body;

            await createDishType(dishTypeData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllDishType: async (req, res) => {
        try {
            const response = await readAllDishType();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readDishTypeById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readDishTypeById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateDishType: async (req, res) => {
        try {
            const { id } = req.params;

            const dishTypeData = req.body;

            await updateDishType(id, dishTypeData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteDishType: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteDishType(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = dishTypeController;
