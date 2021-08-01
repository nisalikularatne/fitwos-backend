const Agora = require('../../services/agora'),
    // AgoraSchema = require('@fitwos/fitwos-application/schemas/agora'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator } = require('../../helpers');
exports.generateToken = async (req, res) => {
    // await schemaValidator(AgoraSchema.generateToken, { ...req.query, ...req.body });
    const {
        channelName,
        uid,
        role
    } = req.body;
    let user = await Agora.generateToken({
        channelName,uid,role
    });
    // res.header('location', `/users/${users.id}`);
    // res.status(HttpStatusCodes.CREATED);
    return user;
};


