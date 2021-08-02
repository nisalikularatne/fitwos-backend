const { FitwosError } = require('../utils/errors');
exports.authentication = async (req, res, next) => {
    let userInfo = req.headers['x-userinfo'];
    if (!userInfo) {
        let error = new FitwosError('User info header missing', 1000, 401);
        res.status(400).send(error);
    }
    const buff = Buffer.from(userInfo, 'base64');
    const user = buff.toString('utf-8');

// print normal string
    req.user = user
    console.log('show the user',user);
    next();

}
;
