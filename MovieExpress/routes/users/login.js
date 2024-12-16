const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {authorization} = require("../../middleware/authorization");
const { validateRequestBody, checkUserExists } = require('../../middleware/userMiddleware');
const bcrypt = require('bcrypt');


//login route
router.post('/', validateRequestBody, checkUserExists('login'), (req, res, next) => {
    // Retrieve password from req.body
    const password = req.body.password;
    const user = req.user;

    // Verify if passwords match
    bcrypt.compare(password, user.hash).then(match => {
        if (!match) {
            // If passwords do not match, return error response
            return res.status(401).json({
                error: true,
                message: "Incorrect password"
            });
        }

        // Passwords match, create and return JWT
        const expiresIn = 60 * 60 * 24; // 24 hours
        const exp = Math.floor(Date.now() / 1000) + expiresIn;
        const token = jwt.sign({ email, exp }, process.env.JWT_SECRET);

        return res.status(200).json({
            token,
            token_type: "Bearer",
            expires_in: expiresIn
        });
    })
    .catch(err => {
        console.error("Database error:", err);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    });

});

module.exports = router;