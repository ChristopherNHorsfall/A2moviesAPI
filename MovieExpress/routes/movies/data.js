const express = require('express');
const router = express.Router();

router.get('/:imdbID', (req, res) => {
    console.log("Accessing: routes/movies/data.js")
    
    const { imdbID } =req.params;

    // QUERY
    let query = req.db('basics as b')
    .select(
        'b.primaryTitle AS Title',
        'b.startYear AS Year',
        'b.runtimeMinutes AS Runtime',
        'b.genres AS Genre',
        'd.primaryName AS Director',
        req.db.raw(
          `(SELECT GROUP_CONCAT(n.primaryName) 
            FROM names AS n 
            WHERE n.nconst IN (
              SELECT cr.writers 
              FROM crew AS cr 
              WHERE cr.tconst = b.tconst 
              UNION 
              SELECT p.nconst 
              FROM principals AS p 
              WHERE p.tconst = b.tconst AND p.category = 'writer'
            )
          ) AS Writers`
        ),
        req.db.raw(
          `(SELECT GROUP_CONCAT(n.primaryName) 
            FROM principals AS p 
            JOIN names AS n ON p.nconst = n.nconst 
            WHERE p.tconst = b.tconst 
            AND (n.primaryProfession LIKE '%actor%' OR n.primaryProfession LIKE '%actress%')
          ) AS Actors`
        ),
        'r.averageRating AS Ratings'
      )
      .leftJoin('ratings AS r', 'b.tconst', 'r.tconst')
      .leftJoin('crew AS cr', 'b.tconst', 'cr.tconst')
      .leftJoin('names AS d', 'cr.directors', 'd.nconst')
      .where('b.tconst', imdbID);


    query.then((data)=>{
        if (data.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        // RESPONSE
        res.json(data);
    })
    .catch((error) => {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'An error occurred while fetching movie details' });
    });
});
module.exports = router;
 
/*
SELECT
    b.primaryTitle AS Title,
    b.startYear AS Year,
    b.runtimeMinutes AS Runtime,
    b.genres AS Genre,
    d.primaryName AS Director,
    (
        SELECT GROUP_CONCAT(n.primaryName)
        FROM movies.names AS n
        WHERE n.nconst IN (
            SELECT cr.writers
            FROM movies.crew AS cr
            WHERE cr.tconst = b.tconst
            UNION
            SELECT p.nconst
            FROM movies.principals AS p
            WHERE p.tconst = b.tconst AND p.category = 'writer'
        )
    ) AS Writers,
    (
        SELECT GROUP_CONCAT(n.primaryName)
        FROM movies.principals AS p
        JOIN movies.names AS n ON p.nconst = n.nconst
        WHERE p.tconst = b.tconst
        AND (n.primaryProfession LIKE '%actor%' OR n.primaryProfession LIKE '%actress%')
    ) AS Actors,
    r.averageRating AS Ratings
FROM 
    movies.basics AS b
LEFT JOIN
    movies.ratings AS r ON b.tconst = r.tconst
LEFT JOIN
    movies.crew AS cr ON b.tconst = cr.tconst
LEFT JOIN
    movies.names AS d ON cr.directors = d.nconst
WHERE 
    b.tconst = 'tt0117731';
*/
