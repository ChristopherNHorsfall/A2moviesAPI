const express = require('express');
const router = express.Router();
const authorization = require("../../middleware/authorization");
const fs = require('fs');
const path = require('path');

// POST/posters/add route
router.post('/:imdbID', authorization,(req, res) => {

    try {
        const { imdbID } = req.params;
        const userEmail = req.user.email; // Retrieved from the authorization middleware
        const fileExtension = '.png';

        if (!imdbID) {
            res.statusCode = 400;
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                error: true,
                message: "You must supply an imdbID!"
            }));
            return;
        }

        // Define file paths
        const folderPath = path.join(__dirname, 'posters', userEmail);
        const filePath = path.join(folderPath, `${imdbID}${fileExtension}`);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); //if parent directories don't exist create them as well
        }

        // Stream the file to the save path
        const fileStream = fs.createWriteStream(filePath);
        req.pipe(fileStream);
    
        // Handle successful upload
        fileStream.on('finish', () => {
            return res.status(200).json({
                error: false,
                message: "Poster uploaded successfully"
            });
        });

        fileStream.on('error', (err) => {
            console.error("File Stream Error:", err);
            return res.status(500).json({
                error: true,
                message: err.message
            });
        });

    } catch (err) {
        console.error("POST/posters/add failed:", err)
        res.status(500).json({ 
            error: true,
            message: err.message
        });
    }
    
});

module.exports = router;