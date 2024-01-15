// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const { readMenuDetailHandler } = require('../controllers/menuDetailController');

// Endpoint GET
router.get('/:id', readMenuDetailHandler);

// Xuất router
module.exports = router;
