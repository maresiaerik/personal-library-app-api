const express = require('express');
const async = require('async');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');


router.get('/:id?', [auth.verifyToken], (req, res) => {
    if (req.params.id) {
        let book = {};
        services.Book.getBookById(req.params.id)
            .then(b => {
                book = b;
                return services.Library.findWhereBookExists(b._id);
            })
            .then(library => {
                if (!book || !library) {
                    throw new Error();
                }
                res.json({ book, library })
            })
            .catch(err => res.sendStatus(500));
    }
    else {
        // for now
        res.status(200).send('No id')
    }
});

module.exports = router;