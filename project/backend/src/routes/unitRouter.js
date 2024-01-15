// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createUnitHandler,
    readUnitHandler,
    updateUnitHandler,
    deleteUnitHandler,
} = require('../controllers/unitController');

// Endpoint POST
router.post('/', createUnitHandler);

// Endpoint GET
router.get('/', readUnitHandler);

// Endpoint PUT
router.put('/:id', updateUnitHandler);

// Endpoint DELETE
router.delete('/:id', deleteUnitHandler);

// Xuất router
module.exports = router;
