const router = require('express').Router();

const { getAllProducts, getLowQuantityProducts } = require('../controllers/inventoryController');

router.get('/products', getAllProducts);
router.get('/low-quantity-products', getLowQuantityProducts);

module.exports = router;
