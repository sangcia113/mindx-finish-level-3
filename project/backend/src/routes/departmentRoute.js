const route = require('express').Router();

const {
    createDepartment,
    readAllDepartment,
    readDepartmentById,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/departmentController');

route.post('/', createDepartment);

route.get('/', readAllDepartment);

route.get('/:id', readDepartmentById);

route.put('/:id', updateDepartment);

route.delete('/:id', deleteDepartment);

module.exports = route;
