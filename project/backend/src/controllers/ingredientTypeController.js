const {
    createIngredientType,
    readAllIngredientType,
    readIngredientTypeById,
    updateIngredientType,
    deleteIngredientType,
} = require('../services/ingredientTypeService');

const ingredientTypeController = {
    createIngredientType: async (req, res) => {
        try {
            const ingredientTypeData = req.body;

            await createIngredientType(ingredientTypeData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllIngredientType: async (req, res) => {
        try {
            const response = await readAllIngredientType();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readIngredientTypeById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readIngredientTypeById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateIngredientType: async (req, res) => {
        try {
            const { id } = req.params;

            const ingredientTypeData = req.body;

            await updateIngredientType(id, ingredientTypeData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteIngredientType: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteIngredientType(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = ingredientTypeController;
