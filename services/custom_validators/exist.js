const JoiError = require('@hapi/joi/lib/errors').ValidationError;

module.exports = (Model, label = '', column = 'id') => {
    return async (value) => {
        let records = null;
        if (Array.isArray(value)) {
            records = await Model.query().whereIn(column, value);
            let difference = value.filter(x => !records.includes(x));
            if (difference.length) {
                throw new JoiError('Error, something went wrong', [{
                    message: `resource "${difference.toString()}" don't exist in relation ${Model.name}`,
                    type: 'any.exist',
                    context: {
                        label: label,
                        value: value,
                        key: label
                    }
                }]);
            }
        } else {
            records = await Model.query().findOne(column, value);
            if (!records) {
                throw new JoiError('Error, something went wrong', [{
                    message: `resource "${value}" doesn't exist in relation ${Model.name}`,
                    type: 'any.exist',
                    context: {
                        label: label,
                        value: value,
                        key: label
                    }
                }]);
            }
        }
    };
};
