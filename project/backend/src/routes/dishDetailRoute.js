const route = require('express').Router();

const {
    createDishDetail,
    readAllDishDetail,
    readDishDetailByDishId,
    updateDishDetail,
    deleteDishDetail,
} = require('../controllers/dishDetailController');

route.post('/', createDishDetail);

route.get('/', readAllDishDetail);

route.get('/:id', readDishDetailByDishId);

route.put('/:id', updateDishDetail);

route.delete('/:id', deleteDishDetail);

module.exports = route;
