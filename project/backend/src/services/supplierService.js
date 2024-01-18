const Supplier = require('../models/supplierModel');

const supplierService = {
    createSupplier: async supplierData => await new Supplier(supplierData).save(),

    readAllSupplier: async () => await Supplier.find(),

    readSupplierById: async id => await Supplier.findById(id),

    updateSupplier: async (id, supplierData) => {
        supplierData.updatedDate = new Date();

        return await Supplier.findByIdAndUpdate(id, supplierData, { new: true });
    },

    deleteSupplier: async id => await Supplier.findByIdAndDelete(id),
};

module.exports = supplierService;
