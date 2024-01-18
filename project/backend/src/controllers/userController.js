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

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readAllUser: async (req, res) => {
        try {
            const response = await readAllUser();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUserById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const userData = req.body;

            const hashedPassword = encodePassword(userData.password);

            await updateUser(id, { ...userData, password: hashedPassword });

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteUser(id);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },
};

module.exports = userController;
