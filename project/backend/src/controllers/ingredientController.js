const {
    createIngredient,
    readAllIngredient,
    readIngredientById,
    updateIngredient,
    deleteIngredient,
} = require('../services/ingredientService');

const ingredientController = {
    createIngredient: async (req, res) => {
        try {
            const ingredientData = req.body;

            await createIngredient(ingredientData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllIngredient: async (req, res) => {
        try {
            const response = await readAllIngredient();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readIngredientById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readIngredientById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateIngredient: async (req, res) => {
        try {
            const { id } = req.params;

            const ingredientData = req.body;

            await updateIngredient(id, ingredientData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteIngredient: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteIngredient(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = ingredientController;
