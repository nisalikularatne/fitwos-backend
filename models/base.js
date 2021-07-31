const { Model } = require('objection');
const environment = process.env.DB_ENV || "development";
const knexInstanceFile = require('../knexfile');
const knex = require('knex');
Model.knex(knex(knexInstanceFile[environment]));

module.exports = Model;
