exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("category")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("category").insert([{"id":1,"name":"Shoulders"},{"id":2,"name":"Chest"},{"id":3,"name":"Back"},{"id":4,"name":"Arms"},{"id":5,"name":"Core"},{"id":6,"name":"Legs"}]);
        });
};