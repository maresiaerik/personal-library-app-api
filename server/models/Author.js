var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        firstname:  String,
        middlename: String,
        lastname: String,
        suffix: String,
    },
    nationality: String,
    imageUrl: String,
    dateOfBirth: Date,
    dateOfDeath: Date,
});


module.exports = AuthorSchema;