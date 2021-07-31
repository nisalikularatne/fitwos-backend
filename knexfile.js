require("dotenv").config();
const pg = require("pg");
// pg.defaults.ssl = true;
console.log('check pool size',process.env.NODE_ENV);
module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DEV_DATABASE_URL,
    pool: {
      min: Number(process.env.DEV_DB_MIN_POOL) || 0,
      max: Number(process.env.DEV_DB_MAX_POOL) || 1
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  testing: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_TEST_HOST,
      port: process.env.POSTGRES_TEST_PORT,
      user: process.env.POSTGRES_TEST_USER,
      password: process.env.POSTGRES_TEST_PASSWORD,
      database: process.env.POSTGRES_TEST_DATABASE
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,

    connection: "postgres://jlvtejfk:1QfTaPRsWiotros5VU7o4LWa3Wny_kap@rosie.db.elephantsql.com/jlvtejfk",

    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
