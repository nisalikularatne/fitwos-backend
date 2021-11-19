exports.up = function(knex) {
    return knex.schema.createTable("notifications", tbl => {
        tbl.increments('id').primary();
        tbl.string("message");
        tbl.string('image_url').nullable();
        tbl.string("type").nullable();
        tbl.uuid('room_uuid').unsigned().references('rooms.room_uuid').notNullable().onDelete('CASCADE');
        tbl.uuid('notification_uuid');
        tbl.timestamp('created_at');
        tbl.timestamp('updated_at');
    });
};

exports.down = function(knex) {
    return knex.schema.table('notifications', table => {
        return knex.schema.dropTableIfExists("notifications");
    })
};
