const router = require('express').Router();

const inventoryController = require('../controllers/inventoryController');

// Write an api endpoint for that getting all products in inventory. (3 Points)
router.get('/all', inventoryController.getAll);

// Update the API to accept a query for getting only products that have low quantity (less than 100). (2 Points)
router.get('/limit', inventoryController.getLimit);

module.exports = router;
