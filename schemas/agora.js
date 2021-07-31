const joi = require('@hapi/joi');

exports.create = {
    schema: () => {
        return joi.object().keys({
            role:joi.string().max(60).required(),
            uid:joi.string().max(60).required(),
            chanelName:joi.string().max(60).required()
        });
    }
};


