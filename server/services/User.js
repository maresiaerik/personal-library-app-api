const mongoose = require('mongoose');
const models = require('../models');

module.exports = {
    getUserById(id) {
        if (!id || !id.length) {
            throw new Error('Id missing');
        }
        return models.User.findOne({ _id: id });
    },
    getUserByEmail(email) {
        if (!email || !email.length) {
            throw new Error('Email missing');
        }
        return models.User.findOne( { email: /email/ });
    },
    getAllUsers() {
        return models.User.find({});
    },
    createUser(body) {
        if (!body) {
            throw new Error('Body missing');
        }
        const User = new models.User(body);
        return User.save();
    },
    updateUser(body) {
        if (!body) {
            throw new Error('Body missing');
        }
        return models.User.update( { _id: body.id }, body);
    },
    deleteUser(id) {
        if (!id || !id.length) {
            throw new Error('Id missing');
        }
        return models.User.remove( { _id: id } );
    }
}
