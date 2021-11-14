exports.up = function(knex, Promise) {
    return knex.schema.createTable("invitees_rooms", tbl => {
        tbl.uuid('user_id');
        tbl.uuid("room_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("invitees_rooms");
};
