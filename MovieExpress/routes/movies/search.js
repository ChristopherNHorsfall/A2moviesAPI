const express = require('express');
const router = express.Router();
const { renameKeys } = require('../../helper/helperFunctions')

router.get('/', (req, res) => {
    console.log("Default Search Route Reached");
    res.json({ message: "Default search route" });
});

router.get('/:title', (req, res) => {

    const { title } =req.params; // Required parameter
    const { year, page} = req.query; // Optional query parameters

    const perPage = 100;
    const pageNumber = parseInt(page, 10) || 1;
    const offset = (pageNumber -1) * perPage;

    let query = req.db('basics')
        .select('primaryTitle', 'startYear', 'tconst', 'titleType')
        .where('primaryTitle', 'like', `%${title}%`)

    if (year) {
        query = query.andWhere('startYear', '=', year)
    }
    query.then((movies)=>{
            if (movies.length === 0) {
                return res.status(404).json({ message: 'No movies found' });
            }
            //define keymapping
            const keyMap ={
                primaryTitle: "Title",
                startYear: "Year",
                tconst: "imdbID",
                titleType: "Type"
            };

            //paginate results
            const total = movies.length;
            const paginatedMovies = movies.slice(offset, offset + perPage)

            //transform movie data
            const transformedMovies = paginatedMovies.map((movie) => renameKeys(movie, keyMap));

            // Pagination metadata
            const currentPage = pageNumber;
            const from = offset;
            const to = Math.min(offset + perPage, total);
            const lastPage = Math.ceil(total / perPage);

            //response
            res.json({
            data: transformedMovies,
            pagination: {
                total,
                lastPage,
                perPage,
                currentPage,
                from,
                to
            }
            });   
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching movies' });
        });

    
});

module.exports = router;