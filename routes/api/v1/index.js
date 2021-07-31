const { expressCallback } = require('@fitwos/fitwos-application/helpers/express');
const express = require('express');

const apiV1Routes = express.Router(),
    UserController = require('@fitwos/fitwos-application/controllers/users'),
    AgoraController = require('@fitwos/fitwos-application/controllers/agora');

apiV1Routes.post('/users', expressCallback(UserController.create));
apiV1Routes.post('/users/login', expressCallback(UserController.login));
apiV1Routes.get('/agora/generateToken',expressCallback(AgoraController.generateToken));
module.exports = apiV1Routes;
