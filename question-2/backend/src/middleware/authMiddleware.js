const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop();

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });

        req.user = decoded;

        next();
    });
};

module.exports = authMiddleware;
