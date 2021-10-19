const joi = require('@hapi/joi');

exports.create = {
    schema: () => {
        return joi.object().keys({
            app_id: joi.string().max(60).required(),
            include_external_user_ids:joi.array().items(joi.string()),
            data:joi.object().required(),
            contents: joi.object().required()

        });
    }
};
