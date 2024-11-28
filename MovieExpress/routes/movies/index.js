const express = require('express');
const searchRoute = require('./search');
const dataRoute = require('./data');
const testRoute = require('./test');

const router = express.Router();

router.use('/test', testRoute);
router.use('/search',searchRoute);
router.use('/data',dataRoute);

console.log("Accessing: routes/movies/index.js")
module.exports = router;