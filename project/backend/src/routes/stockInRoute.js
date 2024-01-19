const route = require('express').Router();

const {
    createStockIn,
    readAllStockIn,
    readStockInById,
    updateStockIn,
    deleteStockIn,
} = require('../controllers/stockInController');

route.post('/', createStockIn);

route.get('/', readAllStockIn);

route.get('/:id', readStockInById);

route.put('/:id', updateStockIn);

route.delete('/:id', deleteStockIn);

module.exports = route;
