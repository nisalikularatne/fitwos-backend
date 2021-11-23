
exports.up = function(knex) {
    return knex.schema.alterTable('invitees_rooms', async table => {
        table.boolean('accepted').nullable();
    });
}

exports.down = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.dropColumn('accepted');
    })
};