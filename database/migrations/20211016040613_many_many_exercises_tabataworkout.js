exports.up = function(knex, Promise) {
    return knex.schema.createTable("tabata_workouts_exercises", tbl => {
        tbl.integer('tabata_workout_id');
        tbl.integer("exercise_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tabata_workouts_exercises");
};
