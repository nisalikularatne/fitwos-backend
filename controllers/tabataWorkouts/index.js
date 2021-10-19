const TabataWorkoutService = require('../../services/tabataWorkouts'),
    HttpStatusCodes = require('http-status-codes'),
    TabataWorkoutSchema = require('../../schemas/tabataWorkout'),
    {schemaValidator} = require('../../helpers');

exports.create = async (req, res) => {
    await schemaValidator(TabataWorkoutSchema.create, {...req.body});
    let {set,warm_up_down,rest,exercise_time,exercises} = req.body;
    let user = req.user;
    let tabataWorkout = await TabataWorkoutService.create({set,warm_up_down,rest,exercise_time,user,exercises});
    res.status(HttpStatusCodes.CREATED);
    return tabataWorkout;
};

exports.getAll = async (req, res) => {
    const {
        room_id
    } = req.params;
    await schemaValidator(TabataWorkoutSchema.getAll, {...req.params, ...req.body});
    let getResponse = await TabataWorkoutService.getAll({room_id});
    res.status(HttpStatusCodes.OK);
    return getResponse;
}

exports.getAllByUser = async (req,res)=>{
    const {user_id} = req.params;
    await schemaValidator(TabataWorkoutSchema.getAllByUser,{...req.params,...req.body});
    let getResponse = await TabataWorkoutService.getAllByUser({user_id});
    res.status(HttpStatusCodes.OK);
    return getResponse;
}
exports.update = async (req, res) => {
    let {set,warm_up_down,rest,exercise_time} = req.body;
    let {id} = req.params
    await schemaValidator(TabataWorkoutSchema.update, {id, ...req.body});
    return await TabataWorkoutService.update(id, {set,warm_up_down,rest,exercise_time})

}
exports.delete = async (req, res) => {
    let {id} = req.params;
    await schemaValidator(TabataWorkoutSchema.delete, {id});
    return await TabataWorkoutService.delete(id);
}
//
// exports.get = async (req, res) => {
//     let {id} = req.params;
//     await schemaValidator(RoomSchema.get, {id});
//     return await RoomService.getRoom(id);
// }
