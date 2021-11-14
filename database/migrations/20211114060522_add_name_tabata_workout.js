exports.up = function(knex) {
    return knex.schema.alterTable('tabata_workouts', async table => {
        table.string('name', 128).nullable();
    });
}

exports.down = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.dropColumn('name');
    })
};
