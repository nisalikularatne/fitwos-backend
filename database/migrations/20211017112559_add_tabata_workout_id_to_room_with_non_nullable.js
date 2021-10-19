exports.up = function(knex) {
    return knex.schema.alterTable('rooms', async table => {
        table.integer('tabata_workout_id').notNullable().alter();
    });
}

exports.down = function(knex) {
    return knex.schema.table('rooms', table => {
        table.dropColumn('tabata_workout_id');
    })
};
