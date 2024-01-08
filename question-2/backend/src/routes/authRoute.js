const router = require('express').Router();

const authController = require('../controllers/authController');

// Create a login API. Generate a token when user get login. (2 Points)
router.post('/', authController.login);

module.exports = router;
