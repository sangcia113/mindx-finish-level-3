// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createStaffHandler,
    readStaffHandler,
    updateStaffHandler,
    deleteStaffHandler,
} = require('../controllers/staffController');

// Endpoint POST
router.post('/', createStaffHandler);

// Endpoint GET
router.get('/', readStaffHandler);

// Endpoint PUT
router.put('/:id', updateStaffHandler);

// Endpoint DELETE
router.delete('/:id', deleteStaffHandler);

// Xuất router
module.exports = router;
