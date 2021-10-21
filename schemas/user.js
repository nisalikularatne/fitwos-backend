const joi = require('@hapi/joi');
const {MAX_ITEMS_PER_PAGE} = require("../config");

exports.create = {
    schema: () => {
        return joi.object().keys({
            name: joi.string().max(60).required()
        });
    }
};

exports.getAll = {
    schema: () => {
        return joi.object().keys({
            username: joi.string().optional().allow(''),
            page: joi.number().positive().optional(),
            page_size: joi.number().positive().optional().allow(null, ''),
            admins: joi.boolean().optional(),
            users: joi.boolean().optional()
        });
    }
}
exports.getFollowers = {
    schema: () => {
        return joi.object().keys({
            sort: joi.string().valid('name', 'id').allow('').optional(),
            order: joi.string().valid('asc', 'desc').allow('').optional(),
            page: joi.number().positive().allow('').optional(),
            page_size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).allow('').optional(),
            query: joi.any()
        });
    }
}
exports.getFollowing = {
    schema: () => {
        return joi.object().keys({
            sort: joi.string().valid('name', 'id').allow('').optional(),
            order: joi.string().valid('asc', 'desc').allow('').optional(),
            page: joi.number().positive().allow('').optional(),
            page_size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).allow('').optional(),
            query: joi.any()
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

exports.login = {
    schema: () => {
        return joi.object().keys({
            username: joi.string().max(60).required(),
            password: joi.string().max(60).required(),
        })
    }
}

exports.update = {
    schema: () => {
        return joi.object().keys({
            username: joi.string().max(60),
            role_id: joi.number().positive(),
            tag: joi.string().optional(),
            id: joi.number().positive().required()
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
