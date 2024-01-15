// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createDishHandler,
    readDishHandler,
    updateDishHandler,
    deleteDishHandler,
} = require('../controllers/dishController');

// Endpoint POST
router.post('/', createDishHandler);

// Endpoint GET
router.get('/', readDishHandler);

// Endpoint PUT
router.put('/:id', updateDishHandler);

// Endpoint DELETE
router.delete('/:id', deleteDishHandler);

// Xuất router
module.exports = router;
