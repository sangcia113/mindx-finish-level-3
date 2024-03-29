const {
    createDishDetail,
    readAllDishDetail,
    readDishDetailByDishId,
    updateDishDetail,
    deleteDishDetail,
} = require('../services/dishDetailService');

const dishDetailController = {
    createDishDetail: async (req, res) => {
        try {
            const dishDetailData = req.body;

            await createDishDetail(dishDetailData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllDishDetail: async (req, res) => {
        try {
            const response = await readAllDishDetail();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readDishDetailByDishId: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readDishDetailByDishId(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateDishDetail: async (req, res) => {
        try {
            const { id } = req.params;

            const dishDetailData = req.body;

            await updateDishDetail(id, dishDetailData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteDishDetail: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteDishDetail(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = dishDetailController;
