const mongoose = require('mongoose');
const UserSchema = require('./User');
const AuthorSchema = require('./Author');
const BookSchema = require('./Book');
const CategorySchema = require('./Category');
const LibrarySchema = require('./Library');
const CategoryClassSchema = require('./CategoryClass');

module.exports.User = new mongoose.model('User', UserSchema);
module.exports.Author = new mongoose.model('Author', AuthorSchema);
module.exports.Book = new mongoose.model('Book', BookSchema);
module.exports.Category = new mongoose.model('Category', CategorySchema);
module.exports.CategoryClassSchema = new mongoose.model('CategoryClass', CategoryClassSchema);
module.exports.Library = new mongoose.model('Library', LibrarySchema);