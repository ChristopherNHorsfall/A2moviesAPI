const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateRequestBody, checkUserExists, hashPassword } = require('../../middleware/userMiddleware');


// register route
router.post('/', 
    validateRequestBody, 
    checkUserExists('register'), 
    hashPassword, 
    (req, res, next) => {
        console.log("Request body:", req.body);
        const { email, hash} = req.body;

        req.body('users')
        .insert({ email, hash})
        .then(()=>{
            res.status(201).json({
                message: 'User created'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: true, message: err.message });
        });
});

module.exports = router;