// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createDepartmentHandler,
    readDepartmentHandler,
    updateDepartmentHandler,
    deleteDepartmentHandler,
} = require('../controllers/departmentController');

// Endpoint POST
router.post('/', createDepartmentHandler);

// Endpoint GET
router.get('/', readDepartmentHandler);

// Endpoint PUT
router.put('/:id', updateDepartmentHandler);

// Endpoint DELETE
router.delete('/:id', deleteDepartmentHandler);

// Xuất router
module.exports = router;
