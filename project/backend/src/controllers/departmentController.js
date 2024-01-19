const {
    createDepartment,
    readAllDepartment,
    readDepartmentById,
    updateDepartment,
    deleteDepartment,
} = require('../services/departmentService');

const departmentController = {
    createDepartment: async (req, res) => {
        try {
            const departmentData = req.body;

            await createDepartment(departmentData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllDepartment: async (req, res) => {
        try {
            const response = await readAllDepartment();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readDepartmentById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readDepartmentById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateDepartment: async (req, res) => {
        try {
            const { id } = req.params;

            const departmentData = req.body;

            await updateDepartment(id, departmentData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteDepartment: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteDepartment(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = departmentController;
