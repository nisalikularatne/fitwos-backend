exports.up = function(knex, Promise) {
    return knex.schema.createTable("follower_following", tbl => {
        tbl.integer('follower_id');
        tbl.integer("following_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("follower_following");
};
