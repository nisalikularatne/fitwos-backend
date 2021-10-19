exports.up = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.dropColumn('room_id');
    });
}

exports.down = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.string('room_id').nullable();
    })
};
