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

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllRole: async (req, res) => {
        try {
            const response = await readAllRole();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readRoleById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readRoleById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;

            const roleData = req.body;

            await updateRole(id, roleData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteRole(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = roleController;
