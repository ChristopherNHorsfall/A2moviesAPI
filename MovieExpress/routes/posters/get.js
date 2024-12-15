const express = require('express');
const router = express.Router();
const authorization = require("../../middleware/authorization");
const fs = require('fs').promises;
const path = require('path');

// GET/posters/{imdbID}
// Get the user's poster for the movie with imdbID
router.get('/:imdbID',authorization, (req, res) => {
    try {
        const { imdbID } = req.params;
        const userEmail = req.user.email; // Retrieved from the authorization middleware

        if (!imdbID) {
            res.statusCode = 400;
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                error: true,
                message: "You must supply an imdbID!"
            }));
            return;
        }
    
        const posterPath = path.join(__dirname, '../posters', userEmail, `${imdbID}.png`);

        // Check if the poster exists using .then()
        fs.access(posterPath)
            .then(() => {
                // Serve the poster file
                res.sendFile(posterPath);
            })
            .catch((err) => {
                console.error("Poster not found:", err);
                res.status(500).json({
                    error: true,
                    message: err.message
                });
            });
    
    } catch (err) {
        console.error("GET /posters/{imdbID} failed:", err);
        // The requested poster could not be found, or failed to read from the disk

            return res.status(500).json({
                error: true,
                message: err.message
            });
    }
    
});

module.exports = router;