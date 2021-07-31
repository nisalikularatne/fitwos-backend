const JoiError = require('@hapi/joi/lib/errors').ValidationError;
module.exports = (Model, label = '', column = 'id') => {
    return async (value) => {
        const records = await Model.query().findOne(column, value);
        if (records) {
            throw new JoiError('Error, something went wrong', [{
                message: `resource ${value} is unique in ${column} ${Model.name}`,
                type: 'any.unique',
                context: {
                    label: label,
                    value: value,
                    key: label
                }
            }]);
        }
    };
};
