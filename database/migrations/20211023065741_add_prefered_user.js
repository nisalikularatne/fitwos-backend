exports.up = function(knex) {
    return knex.schema.alterTable('users', async table => {
        table.string('preferred_name', 128).nullable();
    });
}

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('preferred_username');
    })
};
