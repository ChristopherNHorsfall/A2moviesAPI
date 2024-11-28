const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
    console.log("Accessing: routes/movies/data.js")
    // Logic for fetching movie data
    res.send('Movie data details');
});

module.exports = router;