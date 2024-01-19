const route = require('express').Router();

const {
    createIngredient,
    readAllIngredient,
    readIngredientById,
    updateIngredient,
    deleteIngredient,
} = require('../controllers/ingredientController');

route.post('/', createIngredient);

route.get('/', readAllIngredient);

route.get('/:id', readIngredientById);

route.put('/:id', updateIngredient);

route.delete('/:id', deleteIngredient);

module.exports = route;
