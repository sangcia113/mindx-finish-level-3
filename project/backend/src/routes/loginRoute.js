const router = require('express').Router();

const { read } = require('../controllers/loginController');

router.post('/', read);

module.exports = router;
