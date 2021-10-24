exports.up = function(knex, Promise) {
    return knex.schema.createTable("exercise_category", tbl => {
        tbl.integer('exercise');
        tbl.integer("category");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("exercise_category");
};
