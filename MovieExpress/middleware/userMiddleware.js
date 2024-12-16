module.exports = function validateRequestBody(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'Request body incomplete, both email and password are required'
        });
    }
    next();
}

module.exports = function hashPassword(req, res, next) {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.hash = bcrypt.hashSync(password, saltRounds); // Store hashed password in `req.body.hash`
    next();
}

module.exports = function checkUserExists(action) {
    return (req, res, next) => {
        const { email } = req.body;

        req.db('users')
            .select('*')
            .where({ email })
            .then(users => {
                if (action === 'register' && users.length > 0) {
                    return res.status(409).json({
                        error: true,
                        message: 'User already exists'
                    });
                }
                if (action === 'login' && users.length === 0) {
                    return res.status(401).json({
                        error: true,
                        message: 'User does not exist'
                    });
                }
                req.user = users[0] || null; // Attach user data for downstream use
                next();
            })
            .catch(err => {
                console.error('Database error:', err);
                res.status(500).json({
                    error: true,
                    message: err.message
                });
            });
    };
}
