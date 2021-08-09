const ExerciseService = require('../../services/exercises'),
    ExerciseSchema = require('../../schemas/exercise'),
    HttpStatusCodes = require('http-status-codes'),
    {schemaValidator} = require('../../helpers');
const {DEFAULT_ITEMS_PER_PAGE} = require("../../config");
exports.getAll = async (req, res) => {
    await schemaValidator(ExerciseSchema.getAll, { ...req.query, ...req.body });
    const {
        page = 1,
        page_size = DEFAULT_ITEMS_PER_PAGE,
        query = null,
        sort = 'created_at',
        order = 'asc',
        is_equipment,
        category
    } = req.query;
    let exerciseList = await ExerciseService.getAll({page, page_size, query, sort, order, is_equipment, category});
    res.status(HttpStatusCodes.OK);
    return exerciseList;
};

exports.update = async (req, res) => {
    let {name, category, equipment} = req.body;
    let {id} = req.params
    return await ExerciseService.update(id, {name, category, equipment})

}
exports.delete = async (req, res) => {
    let {id} = req.params;
    return await ExerciseService.delete(id);

}

exports.create = async (req, res) => {
    let {name, category, equipment} = req.body;
    let user = req.user;
    let exercise = await ExerciseService.create({name, category, equipment, user});
    res.status(HttpStatusCodes.CREATED);
    return exercise;
}