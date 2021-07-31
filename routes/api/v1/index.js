const {expressCallback} = require('../../../helpers/express')
const express = require('express');
//routes
const apiV1Routes = express.Router(),
    UserController = require('../../../controllers/users'),
    AgoraController = require('../../../controllers/agora');

apiV1Routes.post('/users', expressCallback(UserController.create));
apiV1Routes.post('/users/login', expressCallback(UserController.login));
apiV1Routes.get('/agora/generateToken',expressCallback(AgoraController.generateToken));
module.exports = apiV1Routes;
