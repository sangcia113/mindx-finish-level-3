const router = require('express').Router();

const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getOrdersWithProductDescription);

module.exports = router;
