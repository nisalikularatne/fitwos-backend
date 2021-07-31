exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl.string("name");
    tbl.timestamp('created_at');
    tbl.timestamp('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
