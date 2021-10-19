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
