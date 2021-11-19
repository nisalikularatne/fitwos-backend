const Room = require('../../models/room');
const User = require('../../models/user');
const {MAX_ITEMS_PER_PAGE} = require("../../config");
const NotificationService = require('../../services/notifications');
const {UUIDGenerator} = require('../../helpers')
require('dotenv').config({path: '../../.env'});
exports.create = async ({start_at, end_at, name, user, is_scheduled,tabata_workout_id,description,url}) => {
    console.log('user sub', user.exp)
    let userObject = await User.query().where({user_uuid: user.sub}).first()
    return Room.query().insert({
        start_at, end_at, name, room_user_host_id: userObject.id, is_scheduled,room_uuid:UUIDGenerator(),tabata_workout_id,description,image_url:url
    }).withGraphFetched('[user,tabata_workouts.[exercises]]');
};

exports.getRooms = async ({
                              page = 1,
                              page_size = MAX_ITEMS_PER_PAGE,
                              query = null,
                              sort = 'id',
                              order = 'asc',
                              is_scheduled,
                              start_at,
                              end_at
                          }) => {

    return Room.query().modify(builder => {
        query && builder.where('name', 'like', `%${query}%`);
        start_at && builder.where('start_at', '>=', start_at);
        end_at && builder.where('end_at', '<=', end_at);
        start_at && end_at && builder.where('start_at', '>=', start_at) && builder.where('end_at', '<=', end_at);
        is_scheduled && builder.where('is_scheduled', is_scheduled);
        builder && builder.page(Number(page) - 1, page_size);
        builder.orderBy(sort, order);
    }).where({is_deleted: false}).withGraphFetched('[user,tabata_workouts.[exercises]]');
}

exports.update = async (room_id, update_room) => {
    const updatedObject = await Room.query().findOne({id: room_id}).throwIfNotFound();
    return updatedObject.$query().patchAndFetch(update_room);
}

exports.delete = async (room_id) => {
    let room = await Room.query().findOne({id: room_id}).throwIfNotFound();
    console.log('show room', room.is_deleted);
    if (room.is_deleted === false) {
        await room.$query().update({is_deleted: true})
    } else {
        return 'Room has already been deleted'
    }
    return `Room deleted`

}

exports.getRoom = async (id) => {
    return Room.query().withGraphFetched('[user,tabata_workouts.[exercises]]').where('room_uuid', id).first().throwIfNotFound();
};

exports.inviteUsers = async (id, users) =>{
    let roomObject = await Room.query().findOne({room_uuid:id}).withGraphFetched('[user,tabata_workouts.[exercises]]');
    console.log('show room object',roomObject);
    await roomObject.$relatedQuery('invited_users').unrelate().whereIn('user_id', users);
    await roomObject.$relatedQuery('invited_users').relate(users);
    let app_id = process.env.ONE_SIGNAL_APP_ID;
    let data = {"foo":"bar"};
    let contents = {en:`${roomObject.user.name} invited you to join his workout ${roomObject.tabata_workouts.name}`}
    let template_id= '10dd6aef-9e6c-46be-8e9a-586b6beb98a2'
    let include_external_user_ids = users;
    const notification = await NotificationService.create({app_id,data,include_external_user_ids,template_id,contents,type:'room_invite',room_uuid:roomObject.room_uuid});
    console.log('show notification',notification);
    await notification.$relatedQuery('users').relate(users);
    return roomObject.$query().withGraphFetched('[invited_users]')
}
