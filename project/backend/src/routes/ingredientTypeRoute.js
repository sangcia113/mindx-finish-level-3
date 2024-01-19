const route = require('express').Router();

const {
    createIngredientType,
    readAllIngredientType,
    readIngredientTypeById,
    updateIngredientType,
    deleteIngredientType,
} = require('../controllers/ingredientTypeController');

route.post('/', createIngredientType);

route.get('/', readAllIngredientType);

route.get('/:id', readIngredientTypeById);

route.put('/:id', updateIngredientType);

route.delete('/:id', deleteIngredientType);

module.exports = route;
