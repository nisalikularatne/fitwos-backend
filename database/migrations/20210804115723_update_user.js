exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('given_name', 128).nullable();
        table.string('family_name', 128).nullable();
        table.string('email', 128);
        table.uuid('user_uuid');
        table.boolean('email_verified');
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('given_name');
        table.dropColumn('family_name');
        table.dropColumn('email');
        table.dropColumn('user_uuid')
    })
};

//user_uuid
//given name
//prefered_name
//email
//email_verified