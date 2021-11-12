exports.up = function(knex, Promise) {
    return knex.schema.createTable("invitees_rooms", tbl => {
        tbl.integer('user_id');
        tbl.integer("room_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("invitees_rooms");
};
