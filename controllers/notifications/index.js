const NotificationSchema = require('../../schemas/notification');
const HttpStatusCodes = require('http-status-codes');
const NotificationService = require('../../services/notifications');
const {schemaValidator} = require("../../helpers");
exports.create = async (req, res) => {

    const {app_id,data,include_external_user_ids,contents} = req.body;
    await schemaValidator(NotificationSchema.create, {...req.body });
    let notification = await NotificationService.create({app_id,data,include_external_user_ids,contents});
    res.status(HttpStatusCodes.OK);
    return notification;
};

exports.get = async(req, res) => {
    //TODO:: get list of notifications for the user;
    
    // dummy notification list 
    res.status(HttpStatusCodes.OK);
    return {
        results:
        [
            {
                id:'AAAAAA-BBBBBB-DDDDDD-EEEEE',
                message:'Your scheduled workout Lower Body is starting in 30 minutes',
                created_at:new Date(),
                notification_image_url:'https://image.shutterstock.com/image-photo/group-athletic-adult-men-women-600w-609082148.jpg',
                type:'room-alert-30-minutes',
                room_uuid:'560fa0e0-46c1-11ec-ad5a-b3bd99e04762'
            },
            {
                id:'AAAAAA-BBBBBB-DDDDDD-EEEEF',
                message:'The workout you created Quick upper body should start in 30 minutes',
                created_at:new Date(),
                notification_image_url:'https://image.shutterstock.com/image-photo/group-athletic-adult-men-women-600w-609082148.jpg',
                type:'room-alert-30-minutes',
                room_uuid:'560fa0e0-46c1-11ec-ad5a-b3bd99e04762'
            },
            {
                id:'AAAAAA-BBBBBB-DDDDDD-EEEEH',
                message:'Stephan Bailey invited you to join this workout',
                created_at:new Date(),
                notification_image_url:'https://image.shutterstock.com/image-photo/group-athletic-adult-men-women-600w-609082148.jpg',
                type:'room-user-invitation',
                room_uuid:'560fa0e0-46c1-11ec-ad5a-b3bd99e04762'
            },
            {
                id:'AAAAAA-BBBBBB-DDDDDD-EEEEG',
                message:'Alex sam joined your workout',
                created_at:new Date(),
                notification_image_url:'https://image.shutterstock.com/image-photo/group-athletic-adult-men-women-600w-609082148.jpg',
                type:'room-user-joined',
                room_uuid:'560fa0e0-46c1-11ec-ad5a-b3bd99e04762'
            }
        ]
        ,total:4}
}
