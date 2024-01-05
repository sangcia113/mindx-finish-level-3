const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/products', inventoryController.getAllProducts);

module.exports = router;
