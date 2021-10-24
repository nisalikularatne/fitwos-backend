exports.up = function(knex) {
    return knex.schema.alterTable('tabata_workouts', async table => {
        table.integer('rest_interval').notNullable().defaultTo(10);
    });
}

exports.down = function(knex) {
    return knex.schema.table('tabata_workouts', table => {
        table.integer('rest_interval').notNullable();
    })
};
