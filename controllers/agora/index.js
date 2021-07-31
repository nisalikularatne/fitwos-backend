const Agora = require('@fitwos/fitwos-application/services/agora'),
    // AgoraSchema = require('@fitwos/fitwos-application/schemas/agora'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator } = require('@fitwos/fitwos-application/helpers');
exports.generateToken = async (req, res) => {
    console.log('show req from generate token',req);
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


