const knex = require('knex');

module.exports = {
    client: 'mysql2',
    connection: {
    host: 'localhost',
    database: 'movies',
    user: 'root',
    password: '6CcBG4810'
    },
   pool: {
     min: 2,             // Minimum number of connections in the pool
     max: 10,            // Maximum number of connections in the pool
   },
 };