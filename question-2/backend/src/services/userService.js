require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        console.log(user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = { login };
