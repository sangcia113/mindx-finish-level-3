const jwt = require('jsonwebtoken');

const { readUserByUsername } = require('../services/userService');

const { decodePassword } = require('../utils');

const loginController = {
    read: async (req, res) => {
        const { username, password } = req.body;

        if (!(username && password))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            const results = await readUserByUsername(username);

            if (!results)
                return res
                    .status(400)
                    .json({ error: -1080, message: 'Tài khoản không tồn tại trong hệ thống!' });

            if (!decodePassword(password, results.password))
                return res.status(403).json({ error: -1081, message: 'Sai mật khẩu!' });

            const payload = {
                _id: results._id,
                name: results.name,
                departmentId: results.departmentId,
                roleId: results.roleId,
            };

            const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY);

            res.json({ error: 0, message: 'Đăng nhập thành công!', accessToken });
        } catch (error) {
            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${error.message}` });
        }
    },
};

module.exports = loginController;
