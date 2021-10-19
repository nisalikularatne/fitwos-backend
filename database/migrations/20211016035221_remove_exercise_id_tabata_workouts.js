exports.up = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.dropColumn('exercise_id');
    });
}

exports.down = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.string('exercise_id').nullable();
    })
};
