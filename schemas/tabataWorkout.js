const joi = require('@hapi/joi');
const Room = require('../models/room'),
    User = require('../models/user'),
    exist = require('../schemas/custom_validators/exist'),
    Exercise = require('../models/exercise');
exports.create = {
    schema: () => {
        return joi.object().keys({
            set:joi.number().positive().required(),
            warm_up_down:joi.number().positive().required(),
            rest:joi.number().positive().required(),
            exercise_time:joi.number().positive().required(),
            exercises: joi.any().optional()
        });
    }
};

exports.getAll = {
    schema: () => {
        return joi.object().keys({
            room_id:joi.number().positive().external(exist(Room, 'room_id', 'id'))
        });
    }
}
exports.getAllByUser = {
    schema: () => {
        return joi.object().keys({
            user_id:joi.number().positive().external(exist(User, 'user_id', 'id'))
        });
    }
}
exports.getByID = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required()
        });
    }
};

exports.update = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required(),
            set:joi.number().positive().optional(),
            warm_up_down:joi.number().positive().optional(),
            rest:joi.number().positive().optional(),
            exercise_time:joi.number().positive().optional()
        });
    }
};

exports.delete = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required()
        });
    }
}
exports.get = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required()
        });
    }
}
