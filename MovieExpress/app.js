const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { morganMiddleware, captureResponseBody } = require('./middleware/morganLogger');
const logOriginalUrl = require('./middleware/logOriginalUrl');
const knexMiddleware = require('./middleware/knexMiddleware');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');
require("dotenv").config();

const routes = require('./routes');
//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
//const moviesRouter = require('./routes/movies');

const app = express();

// Middleware
app.use(captureResponseBody);
app.use(morganMiddleware);
//app.use(logOriginalUrl);
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(knexMiddleware);
// debugging
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.use((req, res, next) => {
//  console.log('------- ROUTE DEBUGGING -------');
//  console.log('Full Request URL:', req.originalUrl);
//  console.log('Request Method:', req.method);
//  console.log('Base URL:', req.baseUrl);
//  console.log('Path:', req.path);
//  console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
//  console.log('------- END ROUTE DEBUGGING -------');
  next();
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
app.use('/', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;