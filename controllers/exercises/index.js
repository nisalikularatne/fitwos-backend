const ExerciseService = require('../../services/exercises'),
    // UserSchema = require('../../schemas/user'),
    HttpStatusCodes = require('http-status-codes'),
    { schemaValidator } = require('../../helpers');
exports.get = async (req, res) => {
    // await schemaValidator(UserSchema.create, { ...req.query, ...req.body });
    console.log('show req',req);
    let exerciseList =  await ExerciseService.get();
    res.status(HttpStatusCodes.OK);
    return exerciseList;
};
