const Exercise = require('../../models/exercise');
const Notification = require('../../models/notification');
const {MAX_ITEMS_PER_PAGE} = require("../../config");
const axios = require('axios');
exports.create = async ( body) => {
    const {app_id,include_external_user_ids,data,contents,template_id,content_available,type,room_uuid} = body;
   try{
       let notification = await axios({
           method: 'post',
           url: 'https://onesignal.com/api/v1/notifications',
           data: {
               app_id,
               include_external_user_ids,
               data,
               contents,
               template_id,
               content_available
           },
           headers:{
               Authorization:`Bearer ${process.env.ONE_SIGNAL_API_KEY}`
           }
       });
      return Notification.query().insert({notification_uuid:notification.data.id,type,room_uuid,message:contents.en});
   }
   catch(e){
       throw e;
   }
};
exports.createInDB = async ( body) => {

};
