// Update with your config settings.
require('dotenv').config();
// console.log(process.env.USER_DB);

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.USER_DB,
      user:     process.env.USER_,
      password: process.env.PASSWORD
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};
