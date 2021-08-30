const joi = require('@hapi/joi'),
    User = require('../models/user'),
    Room = require('../models/room')
    exist = require('../schemas/custom_validators/exist');

exports.generateToken = {
    schema: () => {
        return joi.object().keys({
            role:joi.string().max(60).optional(),
            uid:joi.string().uuid().external(exist(User, 'uid', 'user_uuid')).required(),
            channelName:joi.string().external(exist(Room,'channelName','name')).required()
        });
    }
};


