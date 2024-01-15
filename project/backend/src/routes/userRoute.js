const route = require('express').Router();

const {
    createUser,
    readAllUser,
    readUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const { checkBody, checkParams } = require('../middlewares/userMiddleware');

route.post('/', checkBody, createUser);

route.get('/', readAllUser);

route.get('/:id', checkParams, readUserById);

route.put('/:id', checkParams, updateUser);

route.delete('/:id', checkParams, deleteUser);

module.exports = route;
