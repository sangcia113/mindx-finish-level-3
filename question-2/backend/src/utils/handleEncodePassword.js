const bcrypt = require('bcrypt');

const encodePassword = password => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
};

module.exports = encodePassword;
