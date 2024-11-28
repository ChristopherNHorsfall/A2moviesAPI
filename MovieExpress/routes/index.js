const express = require('express');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const postersRoutes =require('./posters');

const router = express.Router();

router.use('/user', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('/posters', postersRoutes);

console.log("Accessing: routes/index.js")
module.exports = router;
