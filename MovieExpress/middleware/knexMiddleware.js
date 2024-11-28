const options = require('../knexfile.js');
const knex = require('knex')(options);

module.exports = function knexMiddleware(req, res, next) {
  req.db = knex;
  next();
};