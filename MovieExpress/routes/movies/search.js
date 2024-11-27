const express = require('express');
const router = express.Router();


router.get('/search/:title', (req, res) => {
    const { title } =req.params; // Required parameter
    const { year, page} = req.query; // Optional query parameters


    res.send(`Searching for movies with title: ${title}, year: ${year || 'any'}, page: ${page || '1'}`);
});

module.exports = router;