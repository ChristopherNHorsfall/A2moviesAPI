const express = require('express');
const router = express.Router();

router.get('/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    // Logic to retrieve the poster for the given imdbID
    res.send(`Poster details for movie with IMDb ID: ${imdbID}`);
});

module.exports = router;