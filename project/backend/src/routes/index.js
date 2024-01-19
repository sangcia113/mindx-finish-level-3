const router = require('express').Router();

const { verifyToken } = require('../middlewares/authMiddleWare');

const departmentRoute = require('./departmentRoute');
const dishRoute = require('./dishRoute');
const dishDetailRoute = require('./dishDetailRoute');
const dishTypeRoute = require('./dishTypeRoute');
const ingredientRoute = require('./ingredientRoute');
const ingredientTypeRoute = require('./ingredientTypeRoute');
const loginRoute = require('./loginRoute');
const menuRoute = require('./menuRoute');
const roleRoute = require('./roleRoute');
const stockInRoute = require('./stockInRoute');
const stockOutRoute = require('./stockOutRoute');
const supplierRoute = require('./supplierRoute');
const unitRoute = require('./unitRoute');
const userRoute = require('./userRoute');

router.use('/menu/login', loginRoute);

router.use(verifyToken);

router.use('/menu/department', departmentRoute);
router.use('/menu/dish/list', dishRoute);
router.use('/menu/dish/detail', dishDetailRoute);
router.use('/menu/dish/type', dishTypeRoute);
router.use('/menu/ingredient/list', ingredientRoute);
router.use('/menu/ingredient/type', ingredientTypeRoute);
router.use('/menu/list', menuRoute);
router.use('/menu/role', roleRoute);
router.use('/menu/stock/in', stockInRoute);
router.use('/menu/stock/out', stockOutRoute);
router.use('/menu/supplier', supplierRoute);
router.use('/menu/unit', unitRoute);
router.use('/menu/user', userRoute);

module.exports = router;
