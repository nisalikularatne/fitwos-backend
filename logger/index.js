/*eslint no-console: "off"*/

/**
 * Write message to console
 * @param message
 * @param sensitiveData
 * @param staredData
 */
const write = (message = {}, sensitiveData = [], staredData = []) => {
    if (typeof (message) === 'object') {
        if (message.path) {
            if (message.path.includes('identity') || message.path.includes('principals')) {
                message = stripSensitiveInformation(message, sensitiveData, staredData);
            }
        }
    }
    console.log(JSON.stringify(message));
};

/**
 * Write Error message to console
 * @param message
 */
const error = (message) => {
    console.error(message);
};

/**
 * Write warn message to console
 * @param message
 */
const warn = (message) => {
    console.warn(message);
};
/**
 *   helper function to strip sensitive data from the logs
 */
const stripSensitiveInformation = function (obj = {}, sensitiveData = [], staredData = []) {
    if (typeof obj === 'object') {
        for (let key in obj) {
            // checking if it's nested
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                stripSensitiveInformation(obj[key], sensitiveData, staredData);
            } else {
                // printing the flat attributes
                if (sensitiveData.includes(key)) {
                    obj[key] = '*****';
                }
                if (staredData.includes(key)) {
                    if (obj[key].length >= 3) {
                        obj[key] = obj[key].substr(0, 1) + '*'.repeat(obj[key].length - 2) + obj[key].substr(obj[key].length - 1, 1);
                    }
                }
            }
        }
    }
    return obj;
};

module.exports = {
    warn,
    error,
    write
};
