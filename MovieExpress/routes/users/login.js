const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authorization = require("../../middleware/authorization");
const bcrypt = require('bcrypt');


//login route
router.post('/', (req, res, next) => {
  // 1. Retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;
    
    // verify body
  if (!email || !password) {
    res.status(400).json ({
      error: true,
      message: "Request body incomplete - email and password needed"
    });
  return;
  }
  
  // 2. Determine if user already exists in the table
  req.db('users')
  .select('*')
  .where({ email })
  .then(users => {
      if (users.length === 0) {
          // 2.2 If user does not exist, return error response
          return res.status(401).json({
              error: true,
              message: "User does not exist"
          });
      }

      // 2.1 User exists, verify if passwords match
      const user = users[0];
      return bcrypt.compare(password, user.hash).then(match => {
          if (!match) {
              // 2.1.2 If passwords do not match, return error response
              return res.status(401).json({
                  error: true,
                  message: "Incorrect password"
              });
          }

          // 2.1.1 Passwords match, create and return JWT
          const expiresIn = 60 * 60 * 24; // 24 hours
          const exp = Math.floor(Date.now() / 1000) + expiresIn;
          const token = jwt.sign({ email, exp }, process.env.JWT_SECRET);

          return res.status(200).json({
              token,
              token_type: "Bearer",
              expires_in: expiresIn
          });
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