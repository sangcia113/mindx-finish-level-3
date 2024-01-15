const {
    createUser,
    readAllUser,
    readUserById,
    updateUser,
    deleteUser,
} = require('../services/userService');

const userController = {
    createUser: async (req, res) => {
        try {
            const userData = req.body;

            const response = await createUser(userData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllUser: async (req, res) => {
        try {
            const response = await readAllUser();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUserById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const userData = req.body;

            const response = await updateUser(id, userData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteUser(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = userController;
