exports.up = function(knex, Promise) {
    return knex.schema.createTable("tabata_workouts", table => {
        table.increments('id').primary();
        table.integer('set').notNullable();
        table.integer('warm_up_down').notNullable();
        table.integer('exercise_time').notNullable();
        table.integer('rest').notNullable();
        table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE');
        table.integer('room_id').unsigned().references('rooms.id').notNullable().onDelete('CASCADE');
        table.integer('exercise_id').unsigned().references('exercises.id').notNullable().onDelete('CASCADE');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tabata_workouts");
};
