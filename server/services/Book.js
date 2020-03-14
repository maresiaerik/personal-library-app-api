const mongoose = require('mongoose');
const models = require('../models');

module.exports = {
    getBookById(_id) {
        if (!_id) {
            throw new Error('Id missing');
        }
        return models.Book.findOne( { _id } ).populate('authors categories categoryClasses');
        
    },
    getBookByName(name) {
        if (!name || !name.length) {
            throw new Error('Name missing');
        }
        return models.Book.find({ title: {$regex: name, $options: 'i'} }).populate('authors categories categoryClasses');
    },
    getAllBooks() {
        return models.Book.find({}).populate('authors categories categoryClasses');
    },
    createBook(body) {
        if (!body) {
            throw new Error('Body missing')
        }
        for (let i = 0; i < body.authors.length; i++) {
            const author_id = body.authors[i];
            body.authors[i] = mongoose.Types.ObjectId(author_id);
        }
        const book = new models.Book(body);
        return book.save();
    },
    updateBook(body) {
        if (!body) {
            throw new Error('Body missing')
        }
        return models.Book.update( { _id: body.id }, body);
    },
    deleteBook(id) {
        if (!id || !id.length) {
            throw new Error('Id missing')
        }
        return models.Book.remove( { _id: id } );
    },
}