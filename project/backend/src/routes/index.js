const router = require('express').Router();

// const dishRouter = require('./dishRouter');
// const ingredientRouter = require('./ingredientRouter');
// const menuDetailRouter = require('./menuDetailRouter');
// const staffRouter = require('./staffRouter');
// const unitRouter = require('./unitRouter');

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

// router.use('/menu/dish', dishRouter);
// router.use('/menu/dish-type', dishTypeRouter);
// router.use('/menu/dish-detail', dishDetailRouter);
// router.use('/menu/ingredient', ingredientRouter);
// router.use('/menu/ingredient-type', ingredientTypeRouter);
// router.use('/menu/menu', menuRouter);
// router.use('/menu/menu-detail', menuDetailRouter);
// router.use('/menu/staff', staffRouter);
// router.use('/menu/stock-in', stockInRouter);
// router.use('/menu/supplier', supplierRouter);
// router.use('/menu/unit', unitRouter);

module.exports = router;
