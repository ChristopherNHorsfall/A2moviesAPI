const express = require('express');
const searchRoute = require('./search');
const dataRoute = require('./data');

const router = express.Router();

router.use('/search', searchRoute);
router.use('/data', dataRoute);

module.exports = router;