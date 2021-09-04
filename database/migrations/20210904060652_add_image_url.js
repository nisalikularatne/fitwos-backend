exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('image_url').nullable();
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('image_url');
    })
};