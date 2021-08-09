exports.up = function(knex, Promise) {
    return knex.schema.createTable("rooms", tbl => {
        tbl.increments('id').primary();
        tbl.string("name").notNullable();
        tbl.integer('room_user_host_id').unsigned().references('users.id').notNullable().onDelete('CASCADE');
        tbl.timestamp('start_at').notNullable();
        tbl.timestamp('end_at').notNullable();
        tbl.boolean('is_scheduled').defaultTo('true')
        tbl.boolean('is_deleted').defaultTo('false')
        tbl.timestamp('created_at');
        tbl.timestamp('deleted_at');
        tbl.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("rooms");
};
