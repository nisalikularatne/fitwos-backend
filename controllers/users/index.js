const UserService = require('../../services/users'),
    UserSchema = require('../../schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    {schemaValidator} = require('../../helpers');
const {S3} = require("../../helpers/aws");
exports.get = async (req, res) => {
    // await schemaValidator(UserSchema.create, { ...req.query, ...req.body });
    let headers = req.headers;
    let user = await UserService.get({headers});
    res.status(HttpStatusCodes.OK);
    return user;
};
exports.imageUpload= async(req,res)=>{
    const { body } = req || {}
    const { filename, Attachment } = body || {}
    //TODO:process.env to config
    return await S3.upload({
        filename,
        file:Attachment
    }, process.env.S3_BUCKET, process.env.BUCKET_PATH)
}
