const Exercise = require('../../models/exercise');
const {MAX_ITEMS_PER_PAGE} = require("../../config");


exports.getAll = async ({ page = 1, page_size = MAX_ITEMS_PER_PAGE, query = null, sort = 'id', order = 'asc', category, equipment,is_equipment}) => {
    return Exercise.query().modify(builder=>{
        query && builder.where('name', 'like', `%${query}%`);
        equipment && builder.where('equipment', 'like', `%${query}%`);
        category && builder.where('category', category);
        if(is_equipment==='true'){
            builder.whereNotNull('equipment');
        }
        else if(is_equipment==='false'){
            builder.whereNull('equipment');
        }
        builder && builder.page(Number(page) - 1, page_size);
        builder.orderBy(sort, order);
    });
}


exports.update = async (id,update_exercise)=>{
    const updatedObject = await Exercise.query().findOne({ id }).throwIfNotFound();
    return updatedObject.$query().patchAndFetch(update_exercise);
}

exports.delete = async(id)=>{
    let exercise=await Exercise.query().findOne({id}).throwIfNotFound();
    if(!exercise){
        await exercise.$query().delete()
    }
    else{
        return 'Exercise has already been deleted'
    }
    return `Exercise deleted`

}

exports.create = async ({ name,category,equipment }) => {
    return Exercise.query().insert({
        name,category,equipment
    });
};