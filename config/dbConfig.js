const knex = require("knex");
const knexConfig = require("../knexfile");

const environment = process.env.DB_ENV || "development";
console.log(`DB_ENV: ${environment}`);
module.exports = knex(knexConfig[environment]);
