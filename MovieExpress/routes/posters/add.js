const express = require('express');
const router = express.Router();

router.post('/add/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    // Logic to add a poster for the given imdbID
    res.send(`Poster added for movie with IMDb ID: ${imdbID}`);
});

module.exports = router;