exports.up = function(knex, Promise) {
    return knex.schema.createTable("users_notifications", tbl => {
        tbl.uuid('user_id');
        tbl.uuid("notification_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users_notifications");
};
