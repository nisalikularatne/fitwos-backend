const {expressCallback} = require('../../../helpers/express')
const express = require('express');
//routes
const apiV1Routes = express.Router(),
    UserController = require('../../../controllers/users'),
    AgoraController = require('../../../controllers/agora'),
    ExerciseController = require('../../../controllers/exercises');

apiV1Routes.get('/users', expressCallback(UserController.get));
apiV1Routes.get('/agora/generateToken',expressCallback(AgoraController.generateToken));
apiV1Routes.get('/exercises',expressCallback(ExerciseController.get));
module.exports = apiV1Routes;
