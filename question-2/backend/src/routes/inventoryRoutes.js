const router = require('express').Router();

const { getAllProducts, getLimitProducts } = require('../controllers/inventoryController');

router.get('/all', getAllProducts);

router.get('/limit', getLimitProducts);

module.exports = router;
