const {expressCallback} = require('../../../helpers/express')
const express = require('express');
//routes
const apiV1Routes = express.Router(),
    UserController = require('../../../controllers/users'),
    AgoraController = require('../../../controllers/agora'),
    RoomController = require('../../../controllers/rooms'),
    TabataWorkoutController = require('../../../controllers/tabataWorkouts'),
    NotificationController = require('../../../controllers/notifications')
    ExerciseController = require('../../../controllers/exercises');

apiV1Routes.get('/users', expressCallback(UserController.getUser));
apiV1Routes.get('/users/userSuggestion',expressCallback(UserController.getUserSuggestions));
apiV1Routes.get('/users/:id/notifications',expressCallback(UserController.getUserNotification));
apiV1Routes.get('/users/:id/invite',expressCallback(UserController.getRoomInvites));
apiV1Routes.post('/users/imageUpload',expressCallback(UserController.imageUpload));
apiV1Routes.get('/users/:id/getFollowers',expressCallback(UserController.getFollowers));
apiV1Routes.get('/users/:id/getFollowing',expressCallback(UserController.getFollowing));
apiV1Routes.post('/agora/generateToken',expressCallback(AgoraController.generateToken));
apiV1Routes.post('/users/follow',expressCallback(UserController.follow));
apiV1Routes.post('/users/unfollow',expressCallback(UserController.unfollow));
apiV1Routes.put('/users/:id',expressCallback(UserController.edit));
apiV1Routes.get('/users/:id',expressCallback(UserController.get));
//rooms
apiV1Routes.post('/rooms',expressCallback(RoomController.create));
apiV1Routes.get('/rooms',expressCallback(RoomController.getAll));
apiV1Routes.get('/rooms/:id',expressCallback(RoomController.get));
apiV1Routes.post('/rooms/:id',expressCallback(RoomController.update));
apiV1Routes.post('/rooms/:id/invite',expressCallback(RoomController.inviteUsers));
apiV1Routes.delete('/rooms/:id',expressCallback(RoomController.delete));
apiV1Routes.get('/rooms/participants/:room_uuid',expressCallback(RoomController.getParticipants));
apiV1Routes.get('/rooms/:id/invited',expressCallback(RoomController.getInvitedUsers));
//exercises
apiV1Routes.get('/exercises',expressCallback(ExerciseController.getAll));
apiV1Routes.post('/exercises',expressCallback(ExerciseController.create));
apiV1Routes.post('/exercises/:id',expressCallback(ExerciseController.update));
apiV1Routes.get('/exercises/:id',expressCallback(ExerciseController.get));
apiV1Routes.delete('/exercises/:id',expressCallback(ExerciseController.delete));
//workouts
apiV1Routes.post('/tabataWorkouts',expressCallback(TabataWorkoutController.create));
apiV1Routes.get('/tabataWorkouts/rooms/:room_id',expressCallback(TabataWorkoutController.getAll));
apiV1Routes.get('/tabataWorkouts/users/:user_id',expressCallback(TabataWorkoutController.getAllByUser))
apiV1Routes.post('/tabataWorkouts/:id',expressCallback(TabataWorkoutController.update));
apiV1Routes.delete('/tabataWorkouts/:id',expressCallback(TabataWorkoutController.delete));
//notifications
apiV1Routes.post('/notifications',expressCallback(NotificationController.create));
apiV1Routes.get('/notifications',expressCallback(NotificationController.get));
module.exports = apiV1Routes;
