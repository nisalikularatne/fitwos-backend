const { Model } = require('objection');
const environment = process.env.DB_ENV || "development";
const knexInstanceFile = require('@fitwos/fitwos-application/knexfile');
const knex = require('knex');
Model.knex(knex(knexInstanceFile[environment]));

module.exports = Model;
