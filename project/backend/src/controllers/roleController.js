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

            await createRole(roleData);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readAllRole: async (req, res) => {
        try {
            const response = await readAllRole();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readRoleById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readRoleById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;

            const roleData = req.body;

            await updateRole(id, roleData);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteRole(id);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },
};

module.exports = roleController;
