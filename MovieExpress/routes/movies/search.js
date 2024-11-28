const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Default Search Route Reached");
    res.json({ message: "Default search route" });
});

router.get('/:title', (req, res) => {

    console.log("Detailed Search Route - Debug Information:");
    console.log("Full Path:", req.path);
    console.log("URL Parameters:", req.params);
    console.log("Title Parameter:", req.params.title);
    console.log("Full URL:", req.originalUrl);
    console.log("Base URL:", req.baseUrl);


    const { title } =req.params; // Required parameter
    const { year, page} = req.query; // Optional query parameters
/*
    // Simplified response for debugging
    res.json({
        message: 'Search route reached',
        pathDetails: {
            path: req.path,
            params: req.params,
            title,
            year,
            page
        }
    });
*/
    
    req.db('basics')
        .select('primaryTitle', 'startYear', 'tconst', 'titleType')
        .where('primaryTitle', 'like', `%${title}%`)
        .then((movies)=>{
            if (movies.length === 0) {
                return res.status(404).json({ message: 'No movies found' });
              }
              res.json(movies);   
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching movies' });
          });

    
});

module.exports = router;