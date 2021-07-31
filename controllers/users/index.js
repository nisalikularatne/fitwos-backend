const UserService = require('@fitwos/fitwos-application/services/users'),
    UserSchema = require('@fitwos/fitwos-application/schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator } = require('@fitwos/fitwos-application/helpers');
exports.create = async (req, res) => {
    await schemaValidator(UserSchema.create, { ...req.query, ...req.body });
    const {
        name = null
    } = req.body;
    let user = await UserService.create({
        name
    });
    res.header('location', `/users/${user.id}`);
    res.status(HttpStatusCodes.CREATED);
    return user;
};
