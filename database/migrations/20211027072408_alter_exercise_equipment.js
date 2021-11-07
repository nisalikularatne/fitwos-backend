
exports.up = function(knex) {
    return knex.schema.alterTable('exercises', async table => {
        table.boolean('is_equipment').notNullable().defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.table('exercises',async table => {
        table.dropColumn('is_equipment');
    });
};
