const Agora = require('../../services/agora'),
    Room = require('../../models/room'),
    AgoraSchema = require('../../schemas/agora'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator } = require('../../helpers');
exports.generateToken = async (req, res) => {
    await schemaValidator(AgoraSchema.generateToken, { ...req.query, ...req.body });
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
    let room = await Room.query().withGraphFetched('[user,tabata_workouts]').where('room_uuid', channelName).first().throwIfNotFound();
    return {...user,room};
};


