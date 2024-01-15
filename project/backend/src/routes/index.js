const router = require('express').Router();

const departmentRouter = require('./departmentRouter');
const dishRouter = require('./dishRouter');
const dishTypeRouter = require('./dishTypeRouter');
const dishDetailRouter = require('./dishDetailRouter');
const ingredientRouter = require('./ingredientRouter');
const ingredientTypeRouter = require('./ingredientTypeRouter');
const menuRouter = require('./menuRouter');
const menuDetailRouter = require('./menuDetailRouter');
const roleRouter = require('./roleRouter');
const staffRouter = require('./staffRouter');
const stockInRouter = require('./stockInRouter');
const supplierRouter = require('./supplierRouter');
const unitRouter = require('./unitRouter');

router.use('/menu/department', departmentRouter);
router.use('/menu/dish', dishRouter);
router.use('/menu/dish-type', dishTypeRouter);
router.use('/menu/dish-detail', dishDetailRouter);
router.use('/menu/ingredient', ingredientRouter);
router.use('/menu/ingredient-type', ingredientTypeRouter);
router.use('/menu/menu', menuRouter);
router.use('/menu/menu-detail', menuDetailRouter);
router.use('/menu/role', roleRouter);
router.use('/menu/staff', staffRouter);
router.use('/menu/stock-in', stockInRouter);
router.use('/menu/supplier', supplierRouter);
router.use('/menu/unit', unitRouter);

module.exports = router;
