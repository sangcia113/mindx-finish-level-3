// Import module Router từ Express để tạo router
const router = require('express').Router();

// Import controller
const {
    createIngredientHandler,
    readIngredientHandler,
    updateIngredientHandler,
    deleteIngredientHandler,
} = require('../controllers/ingredientController');

// Endpoint POST
router.post('/', createIngredientHandler);

// Endpoint GET
router.get('/', readIngredientHandler);

// Endpoint PUT
router.put('/:id', updateIngredientHandler);

// Endpoint DELETE
router.delete('/:id', deleteIngredientHandler);

// Xuất router
module.exports = router;
