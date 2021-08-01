const { FitwosError } = require('../utils/errors'),
    Logger = require('../logger'),
    { NotFoundError } = require('objection');

exports.expressCallback = (controller) => {
    return async (req, res) => {
        try {
            let controllerResponse = await controller(req, res);
            typeof controllerResponse !== typeof undefined && res.send(controllerResponse);
        } catch (e) {
            if (e instanceof NotFoundError) {
                const error = new FitwosError('the requested resource does not exist', 1000, 404);
                res.status(404).send(error);
            } else if (e.errorCode) {
                res.status(e.httpStatusCode || 400).send({ requestID: req.awsRequestId, ...e.getMessage() });
            } else if (e.data) {
                res.status(400).send(e.data);
            } else if (e.nativeError && e.nativeError.code) {
                Logger.warn('SQL error');
                Logger.error(e);
                res.status(409).send({
                    message: e.nativeError.detail,
                    requestID: req.awsRequestId
                });
            } else if (e.code && e.statusCode && e.requestId) {
                const error = new FitwosError(`AWS-ERROR ${e.code}`, 1000, e.statusCode);
                res.status(e.statusCode).send(error);
            } else {
                Logger.error(e);
                res.status(500).send({
                    message: 'unknown error occurred, contact support',
                    requestID: req.awsRequestId
                });

            }
        }
    };
};
