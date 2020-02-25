var express = require('express');
var router = express.Router();
const books = require('../models/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  books.getAll( (rows, err) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  })
});

module.exports = router;
