const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// register route
router.post('/', (req, res, next) => {
    // Retrieve email and password from req.body
    const email = req.body.email;
    const password = req.body.password;
    console.log("Request body:", req.body);

    // Verify body
    if (!email || !password) {
        res.status(400).json({
            error: true,
            message: 'Request body incomplete, both email and password are required'
        });
        return;
    }

    // Determine if user already exists in table
    req.db('users')
        .select('*')
        .where('email', '=', email)
        .then(users => {
            if (users.length > 0) {
                //console.log("User already exists");
                res.status(409).json({
                    error: true,
                    message: 'User already exists'
                });
                return;
            }

            console.log("No matching users, creating a new user...");
            // Hash the password and insert the new user into the database
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds);
            return req.db('users').insert({ email, hash });
        })
        .then(() => {
            res.status(201).json({ success: true, message: "User created" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: true, message: "Database error" });
        });
});

module.exports = router;