const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
    // Logic for fetching movie data
    res.send('Movie data details');
});

module.exports = router;