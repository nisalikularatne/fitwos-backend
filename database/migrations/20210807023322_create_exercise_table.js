exports.up = function(knex, Promise) {
    return knex.schema.createTable("exercises", tbl => {
        tbl.increments();
        tbl.string("name").notNullable();
        tbl.string('category').notNullable();
        tbl.string('equipment');
        tbl.string('gif_image');
        tbl.string('description')
        tbl.timestamp('created_at');
        tbl.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("exercises");
};
