exports.up = function(knex) {
    return knex.schema.table('rooms', table => {
        table.string('image_url').nullable();
    })
};

exports.down = function(knex) {
    return knex.schema.table('rooms', table => {
        table.dropColumn('image_url');
    })
};
