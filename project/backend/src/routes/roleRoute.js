const route = require('express').Router();

const {
    createRole,
    readAllRole,
    readRoleById,
    updateRole,
    deleteRole,
} = require('../controllers/roleController');

route.post('/', createRole);

route.get('/', readAllRole);

route.get('/:id', readRoleById);

route.put('/:id', updateRole);

route.delete('/:id', deleteRole);

module.exports = route;
