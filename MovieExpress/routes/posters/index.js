const express = require('express');
const getPosterRoute = require('./get');
const addPosterRoute = require('./add');

const router = express.Router();

router.use('/', getPosterRoute);
router.use('/', addPosterRoute);

module.exports = router;