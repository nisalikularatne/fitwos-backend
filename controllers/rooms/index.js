const RoomService = require('../../services/rooms'),
    TabataWorkoutService = require('../../services/tabataWorkouts'),
    HttpStatusCodes = require('http-status-codes'),
    RoomSchema = require('../../schemas/room'),
    {S3} = require("../../helpers/aws"),
    {getRoomUsers} = require('../../utils/users'),
    {schemaValidator} = require('../../helpers');
const {DEFAULT_ITEMS_PER_PAGE} = require("../../config");
const { makeRandomString } = require('../../utils/string_utils');
exports.create = async (req, res) => {
    await schemaValidator(RoomSchema.create, {...req.query, ...req.body});
    let {start_at, end_at, name, is_scheduled,set,warm_up_down,rest,exercise_time,exercises,rest_interval,description,Attachment,filename} = req.body;
    let user = req.user;
    let tabataWorkout = await TabataWorkoutService.create({set,warm_up_down,rest,exercise_time,user,exercises,rest_interval});
    console.log('show the workout',tabataWorkout.id);
    
    let {url} = filename && Attachment ? (await S3.upload({
        filename:makeRandomString(10)+'.'+filename.split('.').slice(-1)[0],
        file:Attachment
    }, process.env.S3_BUCKET, process.env.BUCKET_PATH)): {url:"https://image.shutterstock.com/image-photo/group-athletic-adult-men-women-600w-609082148.jpg"}
    let room = await RoomService.create({start_at, end_at, name, user, is_scheduled,tabata_workout_id:tabataWorkout.id,description,url});
    console.log(`Room Created - room_uuid: ${room.room_uuid}, user_uuid: ${room.user.user_uuid}`);
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
        end_at = null,
        categories,
        is_equipment,
        workout_level,
        workout_duration_min,
        workout_duration_max,
    } = req.query;
    await schemaValidator(RoomSchema.getAll, {...req.query, ...req.body});
    let getResponse = await RoomService.getRooms({page, page_size, query, sort, order, is_scheduled, start_at, end_at, categories, is_equipment, workout_level, workout_duration_min, workout_duration_max});
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
exports.inviteUsers = async (req,res)=> {
    let {id} = req.params;
    console.log('show room',id)
    let {user} = req.body
    console.log('show req body user', user)
    return RoomService.inviteUsers(id,user);
}
