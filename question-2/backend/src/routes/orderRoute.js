const router = require('express').Router();

const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Restrict the resource. Only logged-in user can visit it. (1 Points)
router.get('/all', authMiddleware, orderController.getAll);

// Restrict the resource. Only logged-in user can visit it. (1 Points)
// Create an API for getting orders with the description of product inside each orders. (1 Points)
router.get('/limit/:id', authMiddleware, orderController.getLimit);

module.exports = router;
