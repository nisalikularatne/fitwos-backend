exports.up = function(knex) {
    return knex.schema.table('rooms', table => {
        table.uuid('room_uuid').unique();
    })
};

exports.down = function(knex) {
    return knex.schema.table('rooms', table => {
        table.dropColumn('room_uuid');
    })
};