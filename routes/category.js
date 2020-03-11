const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');

router.get('/:id?', [auth.verifyToken], (req, res) => {
    if (req.params.id) {
        services.Category.getAllCategories()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.sendStatus(500));
    }
    else {
        res.sendStatus(200);
    }
});
router.get('/search/:name', [auth.verifyToken], (req, res) => {
    services.Category.getCategoryByName(req.params.name)
        .then(cat => {
            console.log(cat);
            res.status(200).json(cat)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        });
});

router.post('/new', [auth.verifyToken], (req, res) => {
    services.Author.createAuthor(req.body)
        .then(author => res.status(200).send(author))
        .catch(error => res.sendStatus(500));
});
module.exports = router;