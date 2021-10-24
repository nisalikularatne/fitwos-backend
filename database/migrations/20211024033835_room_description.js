exports.up = function(knex) {
    return knex.schema.alterTable('rooms', async table => {
        table.string('description').nullable();
    });
}

exports.down = function(knex) {
    return knex.schema.table('rooms', table => {
        table.dropColumn('description');
    })
};
