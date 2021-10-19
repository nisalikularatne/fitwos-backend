const UserService = require('../../services/users'),
    UserSchema = require('../../schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    {schemaValidator} = require('../../helpers');
const {S3} = require("../../helpers/aws");
exports.getUser = async (req, res) => {
    // await schemaValidator(UserSchema.create, { ...req.query, ...req.body });
    let headers = req.headers;
    let user = await UserService.getUser({headers});
    res.status(HttpStatusCodes.OK);
    return user;
};
exports.imageUpload= async(req,res)=>{
    const { body } = req || {}
    const {id} = req.user;
    const { filename, Attachment } = body || {}
    let awsResponse = await S3.upload({
        filename,
        file:Attachment
    }, process.env.S3_BUCKET, process.env.BUCKET_PATH)
    const {url} = awsResponse;
    return UserService.saveImage(url,id)
}

exports.get=async(req,res)=>{
    const {id} =req.params;
    return UserService.get(id);
}
exports.follow = async(req,res)=>{
    const {followUsers} = req.body;
    const {id} = req.params;
    return UserService.follow({followUsers,id})
}
exports.unfollow = async(req,res)=>{
    const {unfollowUsers} = req.body;
    const {id} = req.params;
    return UserService.unfollow({unfollowUsers,id})
}
