const express = require('express');
const router = express.Router();
const authorization = require("../../middleware/authorization");

router.post('/:imdbID', authorization,(req, res) => {
    const { imdbID } = req.params;
    // Logic to add a poster for the given imdbID
    res.send(`Poster added for movie with IMDb ID: ${imdbID}`);
});

module.exports = router;