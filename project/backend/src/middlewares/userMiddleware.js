const { checkUserIsExisted } = require('../services/userService');

const userMiddleware = {
    checkParams: async (req, res, next) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ' });

        next();
    },

    checkBody: async (req, res, next) => {
        const { code, name, birthday, gender, numberPhone, password, departmentId, roleId } =
            req.body;

        if (
            !(
                code &&
                name &&
                birthday &&
                (gender || gender === 0) &&
                numberPhone &&
                password &&
                departmentId &&
                roleId
            )
        )
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ' });

        next();
    },

    checkIsExisted: async (req, res, next) => {
        const { code, numberPhone } = req.body;

        const isExisted = await checkUserIsExisted(code, numberPhone);

        if (isExisted)
            return res
                .status(400)
                .json({ error: -1010, message: 'Người dùng đã tồn tại trong hệ thống!' });

        next();
    },
};

module.exports = userMiddleware;
