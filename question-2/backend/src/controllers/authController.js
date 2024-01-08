const authService = require('../services/authService');

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ error: 'Missing params' });

        try {
            const result = await authService.login(username, password);

            res.json({ result });
        } catch (error) {
            console.error('Error during login:', error);

            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = authController;
