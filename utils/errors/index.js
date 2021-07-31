/**
 * Fitwos Error class
 */
class FitwosError extends Error {
    constructor(message, errorCode = 1000, httpStatusCode = 400) {
        super();
        this.name = 'FitwosError';
        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
    }

    getMessage() {
        return { 'Error': this.message };
    }
}


module.exports = {
    FitwosError: FitwosError
};
