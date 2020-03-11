const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const services = require('../server/services');
const jwt = require('jsonwebtoken');

router.get('/:id?', [auth.verifyToken], (req, res, next) => {
  if (req.params.id) {
    services.User.getUserById(req.params.id) 
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
  else {
    console.log('USER: ', req.user);
    services.User.getAllUsers()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});
router.post('/login', [auth.validateUser], (req, res, next) => {
  const token = jwt.sign({ _id: res.locals.user_id }, process.env.TOKEN_SECRET );
  res.status(200).send(token);
});

router.post('/auth', [auth.verifyToken], (req, res, next) => {
  res.status(200).send(true);
});

router.post('/', (req, res) => {
  const { body } = req;
  if (body.username && body.password) {
    services.User.createUser(body)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
