const userMiddleware = {
    checkParams: async (req, res, next) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ' });

        next();
    },

    checkBody: async (req, res, next) => {
        const {
            code,
            name,
            birthday,
            gender,
            numberPhone,
            username,
            password,
            departmentId,
            // superiorId,
            roleId,
            createdDate,
        } = req.body;

        if (
            !(
                code &&
                name &&
                birthday &&
                (gender || gender === 0) &&
                numberPhone &&
                username &&
                password &&
                departmentId &&
                // superiorId &&
                roleId &&
                createdDate
            )
        )
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ' });

        next();
    },
};

module.exports = userMiddleware;
