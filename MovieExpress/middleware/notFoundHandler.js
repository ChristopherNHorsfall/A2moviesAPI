const createError = require('http-errors');

module.exports = function notFoundHandler(req, res, next) {
  next(createError(404));
};