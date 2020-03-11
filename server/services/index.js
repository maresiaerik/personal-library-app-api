const UserService = require('./User');
const BookService = require('./Book');
const AuthorService = require('./Author');
const CategoryService = require('./Category');
const LibraryService = require('./Library');

module.exports.User = UserService;
module.exports.Book = BookService;
module.exports.Author = AuthorService;
module.exports.Category = CategoryService;
module.exports.Library = LibraryService;