const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');

router.get('/:id?', [auth.isLibraryAuthorized], (req, res, next) => {
    services.Library.getLibraryById(req.params.id)
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
router.post('/owner', [auth.verifyToken], (req, res, next) => {
    services.Library.getAuthorizedLibraries(res.locals.user)
        .then(libs => res.status(200).json(libs))
        .catch(err => res.sendStatus(500));
});

router.post('/', (req, res, next) => {
    if (!req.body) {
        res.status(500).json('No body passed');
    }
    const { body } = req;
    console.log(body);
    // body.authorized = ['5e55aa0206b90af17afb4386', '5e55aa6606b90af17afb4387'];
    // body.owners = ['5e55aa0206b90af17afb4386'];

    services.Library.createLibrary(body)
        .then(rows => res.status(200).json(rows) )
        .catch(err => res.status(500).json(err) );
});

router.post('/book', [auth.verifyToken], (req, res) => {
    services.Library.addBook(req.body)
        .then(lib => res.status(200).json(lib))
        .catch(err => res.status(500).json(err));
})

module.exports = router;