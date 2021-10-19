exports.up = function(knex) {
    return knex.schema.table('rooms', async table => {
        table.integer('tabata_workout_id').unsigned().references('tabata_workouts.id').onDelete('CASCADE');
    });
}

exports.down = function(knex) {
    return knex.schema.table('rooms', table => {
        table.dropColumn('tabata_workout_id');
    })
};
