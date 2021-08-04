const UserService = require('../../services/users'),
    UserSchema = require('../../schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    {schemaValidator} = require('../../helpers');
exports.get = async (req, res) => {
    // await schemaValidator(UserSchema.create, { ...req.query, ...req.body });
    let headers = req.headers;
    let user = await UserService.get({headers});
    res.status(HttpStatusCodes.OK);
    return user;
};
