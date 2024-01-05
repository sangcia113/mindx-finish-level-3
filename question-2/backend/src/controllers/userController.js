const userService = require('../services/userService');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

module.exports = { login };
