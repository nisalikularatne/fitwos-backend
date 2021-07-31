const { FitwosError } = require('@fitwos/fitwos-application/errors');
require('dotenv').config({ path: '../../.env' });
const config = require('@fitwos/fitwos-application/config');
const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
    let authorizationHeader = req.headers.authorization || null;
    if (!authorizationHeader) {
        let error = new FitwosError('UNAUTHORIZED', 1000, 401);
        res.status(401).send(error);
    }

    let token = authorizationHeader.substr(7, authorizationHeader.length - 1);
    if (token == null) return res.sendStatus(401);
    await jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        // eslint-disable-next-line no-console
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
