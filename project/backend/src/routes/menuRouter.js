// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createMenuHandler,
    readMenuHandler,
    updateMenuHandler,
    deleteMenuHandler,
} = require('../controllers/menuController');

// Endpoint POST
router.post('/', createMenuHandler);

// Endpoint GET
router.get('/', readMenuHandler);

// Endpoint PUT
router.put('/:id', updateMenuHandler);

// Endpoint DELETE
router.delete('/:id', deleteMenuHandler);

// Xuất router
module.exports = router;
