const models = require('../server/models');
const jwt = require('jsonwebtoken');

module.exports = {
    isLibraryOwner(req, res, next) {
        next()
    },
    isLibraryAuthorized(req, res, next) {
        next()
    },
    validateUser(req, res, next) {
        console.log(req.body);
        const { username, password } = req.body;
        const message = 'Wrong username or password'
        models.User.findOne({ username })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        res.locals.user_id = user._id;
                        next();
                    }
                    else {
                        res.status(401).json(message);
                    }
                }
                else {
                    res.status(401).json(message);
                }
            })
            .catch(err => {
                res.status(500);
            });
    },
    verifyToken(req, res, next) {
        const { authtoken } = req.headers;
        if (!authtoken) {
            res.status(401).json('Access Denied');
        }
        else {
            try {
                const verified = jwt.verify(authtoken, process.env.TOKEN_SECRET);
                models.User.findOne({ _id: verified._id }).then( user => {
                    if (user) {
                        res.locals.user = user;
                        next()
                    }
                    else {
                        throw new Error('No user');
                    }
                });
            } catch (error) {
                res.sendStatus(400).json('Invalid Token');
            }
        }

    }
}