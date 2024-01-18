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

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readAllSupplier: async (req, res) => {
        try {
            const response = await readAllSupplier();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readSupplierById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readSupplierById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    updateSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            const supplierData = req.body;

            await updateSupplier(id, supplierData);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    deleteSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteSupplier(id);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },
};

module.exports = supplierController;
