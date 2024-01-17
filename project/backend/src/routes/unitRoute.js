const route = require('express').Router();

const {
    createUnit,
    readAllUnit,
    readUnitById,
    updateUnit,
    deleteUnit,
} = require('../controllers/unitController');

route.post('/', createUnit);

route.get('/', readAllUnit);

route.get('/:id', readUnitById);

route.put('/:id', updateUnit);

route.delete('/:id', deleteUnit);

module.exports = route;
