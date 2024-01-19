const route = require('express').Router();

const {
    createDish,
    readAllDish,
    readDishById,
    updateDish,
    deleteDish,
} = require('../controllers/dishController');

route.post('/', createDish);

route.get('/', readAllDish);

route.get('/:id', readDishById);

route.put('/:id', updateDish);

route.delete('/:id', deleteDish);

module.exports = route;
