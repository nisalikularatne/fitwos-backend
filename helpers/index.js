const { FitwosError } = require('../utils/errors');
const { v1: uuidV1 } = require('uuid');
exports.schemaValidator = async (schema, body, queryParams = false) => {
    try {
        return await schema.schema().validateAsync(body, { abortEarly: false });
    } catch (e) {
        console.log('error',e);
        let error = e.details;
        let errorArray = [];
        let existsNot = error[0].type === 'any.exist';
        error.map(error => {
            errorArray.push({
                code: 10001,
                title: existsNot ? 'Resource Not Found' : 'Validation Error',
                source: queryParams ?
                    { source: { parameter: error.context.key } }
                    : { pointer: error.context.key },
                details: error.message
            });
        });
        let errorCode = existsNot ? 404 : 400;
        throw new FitwosError(errorArray, 10001, errorCode);
    }
};
exports.UUIDGenerator = () => {
    return uuidV1();
};

function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
function modulo(a, b) {
    return a - Math.floor(a / b) * b;
}
function ToUint32(x) {
    return modulo(ToInteger(x), Math.pow(2, 32));
}
function ToInt32(x) {
    var uint32 = ToUint32(x);
    if (uint32 >= Math.pow(2, 31)) {
        return uint32 - Math.pow(2, 32);
    } else {
        return uint32;
    }
}
exports.convertUUID4toUint32=(uuid4)=>{
    //   uuid4 = 63e3c373-8e10-4fc3-9edf-ba6b9a17d83c
    //   uint32 = 1675871091
    return ToUint32(parseInt('0x'+uuid4.split('-')[0]));
}