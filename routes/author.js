const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');

router.get('/:id?', [auth.verifyToken], (req, res) => {
    if (req.params.id) {
        let author = {};
        services.Author.getAuthorById(req.params.id)
            .then(a => {
                author = a;
                return services.Library.getBooksByAuthor(req.params.id);
                // return services.Author.getAuthorBooks(req.params.id)
            })
            .then(books => {
                const data = {
                    author,
                    books,
                };
                res.status(200).json(data);
            })
            .catch(err => {
                console.log('err: ', err );
                res.sendStatus(500);
            });
    }
    else {
        services.Author.getAuthors()
        .then(authors => res.status(200).json(authors))
        .catch(error => res.sendStatus(500));
    }
});

router.get('/search/:name', [auth.verifyToken], (req, res) => {
    services.Author.getAuthorByName(req.params.name)
        .then(authors => {
            console.log('authors: ', authors);
            res.status(200).json(authors)
        })
        .catch(err => {
            console.log('err: ', err);
            res.sendStatus(500)
        });
});

router.post('/new', [auth.verifyToken], (req, res) => {
    services.Author.createAuthor(req.body)
        .then(author => res.status(200).send(author))
        .catch(error => res.sendStatus(500));
});
module.exports = router;