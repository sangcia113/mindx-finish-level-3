const {
    createRole,
    readAllRole,
    readRoleById,
    updateRole,
    deleteRole,
} = require('../services/roleService');

const roleController = {
    createRole: async (req, res) => {
        try {
            const roleData = req.body;

            const response = await createRole(roleData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllRole: async (req, res) => {
        try {
            const response = await readAllRole();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readRoleById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readRoleById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;

            const roleData = req.body;

            const response = await updateRole(id, roleData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteRole(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = roleController;
