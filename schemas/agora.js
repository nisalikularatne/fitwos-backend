const joi = require('@hapi/joi'),
    User = require('../models/user'),
    Room = require('../models/room')
    exist = require('../schemas/custom_validators/exist');

exports.generateToken = {
    schema: () => {
        return joi.object().keys({
            role:joi.string().max(60).optional(),
            channelName:joi.string().uuid().external(exist(Room,'channelName','room_uuid')).required()
        });
    }
};


