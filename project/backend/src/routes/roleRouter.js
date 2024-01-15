// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createRoleHandler,
    readRoleHandler,
    updateRoleHandler,
    deleteRoleHandler,
} = require('../controllers/roleController');

// Endpoint POST
router.post('/', createRoleHandler);

// Endpoint GET
router.get('/', readRoleHandler);

// Endpoint PUT
router.put('/:id', updateRoleHandler);

// Endpoint DELETE
router.delete('/:id', deleteRoleHandler);

// Xuất router
module.exports = router;
