const {
    createSupplier,
    readAllSupplier,
    readSupplierById,
    updateSupplier,
    deleteSupplier,
} = require('../services/supplierService');

const supplierController = {
    createSupplier: async (req, res) => {
        try {
            const supplierData = req.body;

            await createSupplier(supplierData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllSupplier: async (req, res) => {
        try {
            const response = await readAllSupplier();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readSupplierById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readSupplierById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            const supplierData = req.body;

            await updateSupplier(id, supplierData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteSupplier(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = supplierController;
