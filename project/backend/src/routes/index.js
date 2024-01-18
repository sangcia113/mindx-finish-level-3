const router = require('express').Router();

// const dishRouter = require('./dishRouter');
// const dishTypeRouter = require('./dishTypeRouter');
// const dishDetailRouter = require('./dishDetailRouter');
// const ingredientRouter = require('./ingredientRouter');
// const ingredientTypeRouter = require('./ingredientTypeRouter');
// const menuRouter = require('./menuRouter');
// const menuDetailRouter = require('./menuDetailRouter');
// const staffRouter = require('./staffRouter');
// const stockInRouter = require('./stockInRouter');
// const unitRouter = require('./unitRouter');

const departmentRoute = require('./departmentRoute');
const loginRoute = require('./loginRoute');
const roleRoute = require('./roleRoute');
const supplierRoute = require('./supplierRoute');
const unitRoute = require('./unitRoute');
const userRoute = require('./userRoute');

router.use('/menu/login', loginRoute);

router.use('/menu/department', departmentRoute);
router.use('/menu/role', roleRoute);
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
