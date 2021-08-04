require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');
const User= require('../../models/user')
const axios = require('axios');
// const config = require('@fitwos/fitwos-application/config');
exports.get = async({ headers }) => {
   let userInfo = await axios.get('https://kong.fitwos.club/auth/realms/fitwos/protocol/openid-connect/userinfo', {
       headers: {
           Authorization: headers.authorization //the token is a variable which holds the token
       }
   })
    if(userInfo.data){
        const user = await User.query().where('user_uuid', userInfo.data.sub).first();
        if(!user){
            const {given_name,family_name,sub,email,email_verified,name} = userInfo.data;
            await User.query().insert({
                given_name,family_name,user_uuid:sub,email,email_verified,name
            })
        }
    }
    return userInfo.data
};

// exports.login = async (identity = {}) => {
//     let user = await User.query().where('name', identity.name).first();
//     const token = jwt.sign({
//         user_name: user.name,
//         user_id: user.id
//     }, config.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
//     return { token: token };
// };
