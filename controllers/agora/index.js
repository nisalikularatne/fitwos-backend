const Agora = require('../../services/agora'),
    Room = require('../../models/room'),
    AgoraSchema = require('../../schemas/agora'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator,convertUUID4toUint32 } = require('../../helpers');
exports.generateToken = async (req, res) => {
    await schemaValidator(AgoraSchema.generateToken, { ...req.query, ...req.body });
    const {
        channelName,
    } = req.body;
    console.log('show values',req.user);
    const userObject = req.user
    // res.header('location', `/users/${users.id}`);
    // res.status(HttpStatusCodes.CREATED);
    let room = await Room.query().withGraphFetched('[user,tabata_workouts]').where('room_uuid', channelName).first().throwIfNotFound();
    let agoraUID = convertUUID4toUint32(room.user.user_uuid);
    room.agoraUID = agoraUID
    let user = await Agora.generateToken({
        channelName,user:agoraUID
    });
    return {...user,room};
};


