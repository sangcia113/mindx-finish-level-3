const router = require('express').Router();

const authRoute = require('../routes/authRoute');
const inventoryRoute = require('../routes/inventoryRoute');
const orderRoute = require('../routes/orderRoute');

router.use('/login', authRoute);
router.use('/inventory', inventoryRoute);
router.use('/order', orderRoute);

module.exports = router;
