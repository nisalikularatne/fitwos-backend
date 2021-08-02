const {FitwosError} = require('../utils/errors');
require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');
exports.authentication = async (req, res, next) => {
    let userInfo = req.headers['x-userinfo'];
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        let error = new FitwosError('User token is missing', 1001, 401);
        res.status(400).send(error);
    }
    if (!userInfo) {
        let error = new FitwosError('User info header missing', 1000, 401);
        res.status(400).send(error);
    }
    let token = authorizationHeader.substr(7, authorizationHeader.length - 1);
    if (token == null) return res.sendStatus(401);
    await jwt.verify(token,process.env.PUBLIC_KEY.replace(/\\n/g, '\n'),{ algorithms: ['RS256']}, (err, user_info) => {
        // eslint-disable-next-line no-console
        console.log(err);
        if (err) return res.sendStatus(403);
        const buff = Buffer.from(userInfo, 'base64');
        const user = buff.toString('utf-8');
// print normal string
        req.user = user
        console.log('show the user', user);
        next();
    });


}
;
