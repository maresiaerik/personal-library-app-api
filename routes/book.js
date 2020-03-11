const express = require('express');
const async = require('async');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');


router.get('/:id?', [auth.verifyToken], (req, res) => {
    if (req.params.id) {
        
        services.Library.findWhereBookExists(req.params.id)
        .then(a => res.json(a));
            
        
    }
    else {
        res.status(200).send('No id')
    }
});

module.exports = router;