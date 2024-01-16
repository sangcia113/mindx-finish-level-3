const Supplier = require('../models/supplierModel');

const supplierService = {
    createSupplier: async supplierData => {
        const supplier = new Supplier(supplierData);

        return await supplier.save();
    },

    readAllSupplier: async () => {
        return await Supplier.find();
    },

    readSupplierById: async id => {
        return await Supplier.findById(id);
    },

    updateSupplier: async (id, supplierData) => {
        return await Supplier.findByIdAndUpdate(id, supplierData, { new: true });
    },

    deleteSupplier: async id => {
        return await Supplier.findByIdAndDelete(id);
    },
};

module.exports = supplierService;
