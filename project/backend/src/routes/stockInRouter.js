// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createStockInHandler,
    readStockInHandler,
    updateStockInHandler,
    deleteStockInHandler,
} = require('../controllers/stockInController');

// Endpoint POST
router.post('/', createStockInHandler);

// Endpoint GET
router.get('/', readStockInHandler);

// Endpoint PUT
router.put('/:id', updateStockInHandler);

// Endpoint DELETE
router.delete('/:id', deleteStockInHandler);

// Xuất router
module.exports = router;
