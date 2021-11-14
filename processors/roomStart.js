const Room = require('../models/room');
require('dotenv').config({path: '../../.env'});
const moment = require('moment');
const NotificationService = require('../services/notifications');
exports.roomToStart = async()=>{
    const rooms = await Room.query().where({start_at:moment().utc().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')}).withGraphFetched('[invited_users,user,tabata_workouts]')
    await Promise.all(rooms.map(async (room) => {
      if(room.id){
              let app_id = process.env.ONE_SIGNAL_APP_ID;
              let data = {"foo":"bar"};
              let contents = {en:`The workout you created ${room.tabata_workouts.name} will start in 30 minutes`}
              let template_id = '45cd68a9-9cd7-4fff-95e2-8739f1c4e7dc';
              let include_external_user_ids = [room.user.user_uuid]
              await NotificationService.create({app_id,data,include_external_user_ids,contents,template_id});
              await room.invited_users.map(async invited_user=>{
                  let app_id = process.env.ONE_SIGNAL_APP_ID;
                  let data = {"foo":"bar"};
                  let contents = {en:`Your workout ${room.tabata_workouts.name} will start in 30 minutes`}
                  let template_id = '643a12dc-7920-478c-be9a-5a7bd67799de';
                  let include_external_user_ids = [invited_user.user_uuid]
                  await NotificationService.create({app_id,data,include_external_user_ids,contents,template_id});
              })

      }
    }));
}
