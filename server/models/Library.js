var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    name:  String,
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    authorized: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    public: Boolean,
});