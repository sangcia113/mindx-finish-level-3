const route = require('express').Router();

const {
    createStockOut,
    readAllStockOut,
    readStockOutById,
    updateStockOut,
    deleteStockOut,
} = require('../controllers/stockOutController');

route.post('/', createStockOut);

route.get('/', readAllStockOut);

route.get('/:id', readStockOutById);

route.put('/:id', updateStockOut);

route.delete('/:id', deleteStockOut);

module.exports = route;
