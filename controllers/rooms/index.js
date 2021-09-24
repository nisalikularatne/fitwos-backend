const RoomService = require('../../services/rooms'),
    HttpStatusCodes = require('http-status-codes'),
    RoomSchema = require('../../schemas/room'),
    {getRoomUsers} = require('../../utils/users'),
    {schemaValidator} = require('../../helpers');
const {DEFAULT_ITEMS_PER_PAGE} = require("../../config");
exports.create = async (req, res) => {
    await schemaValidator(RoomSchema.create, {...req.query, ...req.body});
    let {start_at, end_at, name, is_scheduled} = req.body;
    let user = req.user;
    let room = await RoomService.create({start_at, end_at, name, user, is_scheduled});
    res.status(HttpStatusCodes.CREATED);
    return room;
};

exports.getAll = async (req, res) => {
    const {
        page = 1,
        page_size = DEFAULT_ITEMS_PER_PAGE,
        query = null,
        sort = 'created_at',
        order = 'asc',
        is_scheduled,
        start_at = null,
        end_at = null
    } = req.query;
    await schemaValidator(RoomSchema.getAll, {...req.query, ...req.body});
    let getResponse = await RoomService.getRooms({page, page_size, query, sort, order, is_scheduled, start_at, end_at});
    res.status(HttpStatusCodes.OK);
    return getResponse;
}

exports.update = async (req, res) => {
    let {start_at, end_at, name} = req.body;
    let {id} = req.params
    await schemaValidator(RoomSchema.update, {id, ...req.body});
    return await RoomService.update(id, {start_at, end_at, name, id})

}
exports.delete = async (req, res) => {
    let {id} = req.params;
    await schemaValidator(RoomSchema.delete, {id});
    return await RoomService.delete(id);
}

exports.get = async (req, res) => {
    let {id} = req.params;
    await schemaValidator(RoomSchema.get, {id});
    console.log('show participants',getRoomUsers('6d90b810-0d48-11ec-ba8f-599d525ad325'));
    return await RoomService.getRoom(id);
}

exports.getParticipants = async (req,res)=> {
    console.log('show the values',req.params);
    let {room_uuid} = req.params;
    return getRoomUsers(room_uuid);
}
