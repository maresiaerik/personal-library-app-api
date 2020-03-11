const mongoose = require('mongoose');
const models = require('../models');

module.exports = {
    getAuthors() {
        return models.Author.find();
    },
    getAuthorById(id) {
        if (!id || !id.length) {
            throw new Error('Id missing')
        }
        const _id = mongoose.Types.ObjectId(id);
        return models.Author.findOne( { _id } );
    },
    getAuthorByName(name) {
        if (!name || !name.length) {
            throw new Error('Name missing')
        }

        return models.Author.aggregate([
            {
                $project: {
                    'fullName' : { $concat : [ '$name.firstname',  ' ', '$name.lastname' ] },
                    'author': '$$ROOT.name',
                },
            },
            {
                $match: {
                    $or: [
                        { 'fullName': { '$regex': name, '$options': 'i' } },
                        { 'author.firstname': { '$regex': name, '$options': 'i' } },
                        { 'author.middlename': { '$regex': name, '$options': 'i' } },
                        { 'author.lastname': { '$regex': name, '$options': 'i' } },
                        { 'author.suffix': { '$regex': name, '$options': 'i' } },
                    ]
                },
            }
        ]);
    },
    getAuthorBooks(id) {
        if (!id || !id.length) {
            throw new Error('Author ID missing');
        }
        const _id = mongoose.Types.ObjectId(id);
        const query = {
            authors: {
                $in: _id,
            },
        };
        return models.Book.find(query, '_id authors title imageUrl');
    },
    updateAuthor(body) {
        if (!body) {
            throw new Error('Body missing')
        }
        return models.Author.update( { _id: body.id }, body)
    },
    createAuthor(body) {
        if (!body) {
            throw new Error('Name missing')
        }
        const author = new models.Author(body);
        return author.save();
    }
}