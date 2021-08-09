const joi = require('@hapi/joi');
const {MAX_ITEMS_PER_PAGE} = require("../config");

exports.create = {
    schema: () => {
        return joi.object().keys({
            name: joi.string().max(60).required(),
            is_scheduled: joi.boolean().optional(),
            start_at: joi.date().iso().greater('now').required(),
            end_at: joi.date().iso().greater(joi.ref('start_at')).required()
        });
    }
};

exports.getAll = {
    schema: () => {
        return joi.object().keys({
            sort: joi.string().valid('name', 'start_at', 'end_at', 'is_scheduled', 'id').allow('').optional(),
            order: joi.string().valid('asc', 'desc').allow('').optional(),
            start_at: joi.date().optional(),
            end_at: joi.date().optional(),
            is_scheduled: joi.boolean().optional(),
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

exports.update = {
    schema: () => {
        return joi.object().keys({
            name: joi.string().max(60).required(),
            is_scheduled: joi.boolean().optional(),
            start_at: joi.date().iso().greater('now').required(),
            end_at: joi.date().iso().greater(joi.ref('start_at')).required(),
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
exports.get = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required()
        });
    }
}