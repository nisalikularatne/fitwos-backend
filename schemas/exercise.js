const joi = require('@hapi/joi');
const {MAX_ITEMS_PER_PAGE} = require("../config");

exports.create = {
    schema: () => {
        return joi.object().keys({
            name: joi.string().max(60).required(),
            category:joi.string().max(60).required(),
            equipment:joi.string().max(60).required()
        });
    }
};

exports.getAll = {
    schema: () => {
        return joi.object().keys({
            sort: joi.string().valid('name', 'category','equipment').allow('').optional(),
            order: joi.string().valid('asc', 'desc').allow('').optional(),
            categories:joi.any(),
            equipment: joi.string().optional(),
            is_equipment: joi.boolean().optional(),
            page: joi.number().positive().allow('').optional(),
            page_size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).allow('').optional(),
            query: joi.any(),
            gif: joi.boolean().optional()
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
            category:joi.string().max(60).required(),
            equipment:joi.string().max(60).required()
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
