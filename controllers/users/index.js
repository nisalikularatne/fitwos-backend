const UserService = require('../../services/users'),
    UserSchema = require('../../schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    {schemaValidator} = require('../../helpers');
const {DEFAULT_ITEMS_PER_PAGE} = require("../../config");
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
    const {id} = req.user;
    return UserService.follow({followUsers,id})
}
exports.unfollow = async(req,res)=>{
    const {unfollowUsers} = req.body;
    const {id} = req.user;
    return UserService.unfollow({unfollowUsers,id})
}
exports.getFollowers = async(req,res)=>{
    console.log('show followers');
    const {id} = req.user;
    console.log('show id',id);
    const {
        page = 1,
        page_size = DEFAULT_ITEMS_PER_PAGE,
        query = null,
        sort = 'created_at',
        order = 'asc'
    } = req.query;
    await schemaValidator(UserSchema.getFollowers, {...req.query, ...req.body});
    return UserService.getFollowers({page, page_size, query, sort, order,id});
}
exports.getFollowing = async(req,res)=>{
    const {id} = req.user;
    const {
        page = 1,
        page_size = DEFAULT_ITEMS_PER_PAGE,
        query = null,
        sort = 'created_at',
        order = 'asc'
    } = req.query;
    await schemaValidator(UserSchema.getFollowing, {...req.query, ...req.body});
    return UserService.getFollowing({page, page_size, query, sort, order,id});
}
