const express = require('express');
//const getPosterRoute = require('./get');
const addPosterRoute = require('./add');

const router = express.Router();

//router.use('/', getPosterRoute);
router.use('/add', addPosterRoute);

router.get('/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    // Logic to retrieve the poster for the given imdbID
    res.send(`Poster details for movie with IMDb ID: ${imdbID}`);
});


module.exports = router;