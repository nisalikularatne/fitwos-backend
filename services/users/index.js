const User = require('@fitwos/fitwos-application/models/user');
require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');
// const config = require('@fitwos/fitwos-application/config');
exports.create = ({ name }) => {
    return User.query().insert({
        name
    });
};

// exports.login = async (identity = {}) => {
//     let user = await User.query().where('name', identity.name).first();
//     const token = jwt.sign({
//         user_name: user.name,
//         user_id: user.id
//     }, config.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
//     return { token: token };
// };
