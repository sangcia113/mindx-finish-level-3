const route = require('express').Router();

const {
    createMenu,
    readAllMenu,
    readMenuById,
    updateMenu,
    deleteMenu,
} = require('../controllers/menuController');

route.post('/', createMenu);

route.get('/', readAllMenu);

route.get('/:id', readMenuById);

route.put('/:id', updateMenu);

route.delete('/:id', deleteMenu);

module.exports = route;
