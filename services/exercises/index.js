const Exercise = require('../../models/exercise');
const {MAX_ITEMS_PER_PAGE} = require("../../config");


exports.getAll = async ({
                            page = 1,
                            page_size = MAX_ITEMS_PER_PAGE,
                            query = null,
                            sort = 'id',
                            order = 'asc',
                            categories,
                            equipment,
                            is_equipment,
                            gif
                        }) => {
    const category_filters = categories && categories.split(',').map(c=>c.toLowerCase().trim());
    return Exercise.query().modify(builder => {
        query && builder.where('exercises.name', 'ilike', `%${query}%`);
        equipment && builder.where('equipment', 'ilike', `%${query}%`);
        gif && builder.whereNotNull('gif_image');
        is_equipment && builder.where('exercises.is_equipment','=',is_equipment);
        // if (is_equipment === 'true') {
        //     builder.whereNotNull('equipment');
        // } else if (is_equipment === 'false') {
        //     builder.whereNull('equipment');
        // }
        category_filters && builder.join('exercise_category', 'exercises.id', '=', 'exercise_category.exercise')
            .join('category','category.id','=','exercise_category.category').whereIn('category.name',category_filters)
        builder && builder.page(Number(page) - 1, page_size);
        builder.orderBy(sort, order);
    }).withGraphFetched('categories')


}
exports.get = async (id) => {
    return Exercise.query().withGraphFetched('[categories]').where('id', id).first().throwIfNotFound();
};


exports.update = async (id, update_exercise) => {
    const updatedObject = await Exercise.query().findOne({id}).throwIfNotFound();
    return updatedObject.$query().patchAndFetch(update_exercise);
}

exports.delete = async (id) => {
    let exercise = await Exercise.query().findOne({id}).throwIfNotFound();
    if (!exercise) {
        await exercise.$query().delete()
    } else {
        return 'Exercise has already been deleted'
    }
    return `Exercise deleted`

}

exports.create = async ({name, category, equipment}) => {
    return Exercise.query().insert({
        name, category, equipment
    });
};
