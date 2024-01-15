// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createDishTypeHandler,
    readDishTypeHandler,
    updateDishTypeHandler,
    deleteDishTypeHandler,
} = require('../controllers/dishTypeController');

// Endpoint POST
router.post('/', createDishTypeHandler);

// Endpoint GET
router.get('/', readDishTypeHandler);

// Endpoint PUT
router.put('/:id', updateDishTypeHandler);

// Endpoint DELETE
router.delete('/:id', deleteDishTypeHandler);

// Xuất router
module.exports = router;
