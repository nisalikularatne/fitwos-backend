exports.up = function(knex) {
    return knex.schema.createTable("category", tbl => {
        tbl.increments('id').primary();
        tbl.string("name");
        tbl.timestamp('created_at');
        tbl.timestamp('updated_at');
    });
};

exports.down = function(knex) {
    return knex.schema.table('category', table => {
        return knex.schema.dropTableIfExists("category");
    })
};
