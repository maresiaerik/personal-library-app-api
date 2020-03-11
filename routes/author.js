const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');

router.get('/', [auth.verifyToken], (req, res) => {
    services.Author.getAuthors()
        .then(authors => res.status(200).json(authors))
        .catch(error => res.sendStatus(500));
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