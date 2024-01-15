// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const { readDishDetailHandler } = require('../controllers/dishDetailController');

// Endpoint GET
router.get('/:id', readDishDetailHandler);

// Xuất router
module.exports = router;
