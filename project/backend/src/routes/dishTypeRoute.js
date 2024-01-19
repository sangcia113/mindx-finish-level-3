const route = require('express').Router();

const {
    createDishType,
    readAllDishType,
    readDishTypeById,
    updateDishType,
    deleteDishType,
} = require('../controllers/dishTypeController');

route.post('/', createDishType);

route.get('/', readAllDishType);

route.get('/:id', readDishTypeById);

route.put('/:id', updateDishType);

route.delete('/:id', deleteDishType);

module.exports = route;
