const Room = require('../models/room');
require('dotenv').config({path: '../../.env'});
const moment = require('moment');
const NotificationService = require('../services/notifications');
exports.roomToStart = async()=>{
    const rooms = await Room.query().where({start_at:moment().utc().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')}).withGraphFetched('user')
    // console.log('show rooms',rooms,moment().utc().add(30, 'minutes'));
    await Promise.all(rooms.map(async (room) => {
      if(room.id){
              console.log('show room',room.user.user_uuid);
              let app_id = process.env.ONE_SIGNAL_APP_ID;
              let data = {"foo":"bar"};
              let contents = {en:'Your workout is scheduled in 30 minutes'}
              let include_external_user_ids = [room.user.user_uuid]
          // console.log('show the values here',await NotificationService.create({app_id,data,include_external_user_ids,contents}))
              return await NotificationService.create({app_id,data,include_external_user_ids,contents});
      }
    }));
    // console.log('show room',room.id);
    // if(room.id){
    //     console.log('show room');
    //     let app_id = process.env.ONE_SIGNAL_APP_ID;
    //     let data = {};
    //     let contents = 'Your workout is scheduled in 30 minutes'
    //     let include_external_user_ids = [room.room_user_host_id]
    //     return await NotificationService.create({app_id,data,include_external_user_ids,contents});
    //
    // }

}
