const models = require('../models');

module.exports = {
    getAuthors() {
        return models.Author.find();
    },
    getAuthorById(id) {
        if (!id || !id.length) {
            throw new Error('Id missing')
        }
        return models.Author.find( { _id: id } );
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
    updateAuthor(body) {
        if (!body || !body.length) {
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