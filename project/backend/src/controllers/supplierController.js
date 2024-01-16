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

            const response = await createSupplier(supplierData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllSupplier: async (req, res) => {
        try {
            const response = await readAllSupplier();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readSupplierById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readSupplierById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            const supplierData = req.body;

            const response = await updateSupplier(id, supplierData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteSupplier: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteSupplier(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = supplierController;
