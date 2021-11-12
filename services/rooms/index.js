const Room = require('../../models/room');
const User = require('../../models/user');
const {MAX_ITEMS_PER_PAGE} = require("../../config");
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
    return Room.query().withGraphFetched('[user,tabata_workouts.[exercises]]').where('id', id).first().throwIfNotFound();
};

exports.inviteUsers = async (id, users) =>{
    let roomObject = await Room.query().findOne({id});
    await roomObject.$relatedQuery('invited_users').relate(users);
    return roomObject.$query().withGraphFetched('[invited_users]')
}
