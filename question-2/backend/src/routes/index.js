const router = require('express').Router();

const authRoutes = require('../routes/authRoutes');
const inventoryRoutes = require('../routes/inventoryRoutes');
const orderRoutes = require('../routes/orderRoutes');

router.use('/login', authRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/order', orderRoutes);

module.exports = router;
