// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createSupplierHandler,
    readSupplierHandler,
    updateSupplierHandler,
    deleteSupplierHandler,
} = require('../controllers/supplierController');

// Endpoint POST
router.post('/', createSupplierHandler);

// Endpoint GET
router.get('/', readSupplierHandler);

// Endpoint PUT
router.put('/:id', updateSupplierHandler);

// Endpoint DELETE
router.delete('/:id', deleteSupplierHandler);

// Xuất router
module.exports = router;
