const TabataWorkout = require('../../models/tabataWorkout');
const User = require('../../models/user');
const {MAX_ITEMS_PER_PAGE} = require("../../config");
require('dotenv').config({path: '../../.env'});
exports.create = async ({room_id, set, warm_up_down, rest, exercise_time, user, exercise_id}) => {
    console.log('user sub', user.exp)
    let userObject = await User.query().where({user_uuid: user.sub}).first()
    return TabataWorkout.query().insert({
        room_id, set, warm_up_down, rest, exercise_time, user_id: userObject.id, exercise_id
    });
};

exports.getAll = async ({room_id}) => {

    return TabataWorkout.query().where({room_id}).withGraphFetched('[room,exercise]');
}

exports.getAllByUser = async({user_id})=>{
    return TabataWorkout.query().where({user_id})
}
exports.update = async(id,update_workout)=>{
    const updatedObject = await TabataWorkout.query().findOne({id}).throwIfNotFound();
    console.log('show update',update_workout);
    return updatedObject.$query().patchAndFetch(update_workout);
}

exports.delete = async(id)=>{
    let workout=await TabataWorkout.query().findOne({id}).throwIfNotFound();
    if(!workout){
        await workout.$query().delete()
    }
    else{
        return 'workout has already been deleted'
    }
    return `workout deleted`

}