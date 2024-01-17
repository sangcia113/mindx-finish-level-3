const route = require('express').Router();

const {
    createSupplier,
    readAllSupplier,
    readSupplierById,
    updateSupplier,
    deleteSupplier,
} = require('../controllers/supplierController');

route.post('/', createSupplier);

route.get('/', readAllSupplier);

route.get('/:id', readSupplierById);

route.put('/:id', updateSupplier);

route.delete('/:id', deleteSupplier);

module.exports = route;
