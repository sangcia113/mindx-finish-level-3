const {
    createUser,
    readAllUser,
    readUserById,
    updateUser,
    deleteUser,
} = require('../services/userService');

const { encodePassword } = require('../utils/handleHashPassword');

const userController = {
    createUser: async (req, res) => {
        try {
            const userData = req.body;

            const hashedPassword = encodePassword(userData.password);

            await createUser({ ...userData, password: hashedPassword });

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllUser: async (req, res) => {
        const { page, pageSize } = req.query;

        try {
            const response = await readAllUser(page, pageSize);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUserById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const userData = req.body;

            const hashedPassword = encodePassword(userData.password);

            await updateUser(id, { ...userData, password: hashedPassword });

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteUser(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = userController;
