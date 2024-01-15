// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createIngredientTypeHandler,
    readIngredientTypeHandler,
    updateIngredientTypeHandler,
    deleteIngredientTypeHandler,
} = require('../controllers/ingredientTypeController');

// Endpoint POST
router.post('/', createIngredientTypeHandler);

// Endpoint GET
router.get('/', readIngredientTypeHandler);

// Endpoint PUT
router.put('/:id', updateIngredientTypeHandler);

// Endpoint DELETE
router.delete('/:id', deleteIngredientTypeHandler);

// Xuất router
module.exports = router;
