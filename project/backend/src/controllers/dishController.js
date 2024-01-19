const {
    createDish,
    readAllDish,
    readDishById,
    updateDish,
    deleteDish,
} = require('../services/dishService');

const { createDishDetail, deleteDishDetail } = require('../services/dishDetailService');

const dishController = {
    createDish: async (req, res) => {
        try {
            const dishData = req.body;

            const response = await createDish(dishData);

            const dishDetailData = dishData.dishDetail.map(item => ({
                ...item,
                dishId: response._id,
            }));

            console.log(dishDetailData);

            await createDishDetail(dishDetailData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllDish: async (req, res) => {
        try {
            const response = await readAllDish();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readDishById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readDishById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateDish: async (req, res) => {
        try {
            const { id } = req.params;

            const dishData = req.body;

            await updateDish(id, dishData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteDish: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteDish(id);

            await deleteDishDetail(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = dishController;
