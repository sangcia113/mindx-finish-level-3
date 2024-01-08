require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const authService = {
    login: async (username, password) => {
        try {
            const user = await User.findOne({ username });

            if (!user) return res.status(401).json({ error: 'User not existed' });

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return token;
        } catch (error) {
            console.error('Error during login:', error);

            return { error: 'Internal Server Error' };
        }
    },
};

module.exports = authService;
