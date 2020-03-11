const mongoose = require('mongoose');
const models = require('../models');

module.exports = {
    getLibraryById(id) {
        console.log('isnide');
        if (!id || !id.length) {
            throw new Error('Id missing');
        }
        return models.Library.findOne( { _id: id } ).populate('owners authorized books');
    },
    getLibraryByName(name) {
        if (!name || !name.length) {
            throw new Error('Name missing');
        }
        return models.Library.find( { name: /name/ });
    },
    getOwnerLibraries(user) {
        if (!user) {
            throw new Error('Id missing');
        }
        const populateUserQuery = {
            path:'owners',
            match: { '_id': user._id }
        };
        return models.Library
            .find()
            .populate(populateUserQuery)
            .populate('books authorized');
    },
    getAuthorizedLibraries(user) {
        if (!user || !user.length) {
            throw new Error('Id missing');
        }
        const id = mongoose.Types.ObjectId(user._id);
        return models.Library.find({ 'authorized._id':  id }).populate('books authorized');
    },
    getBooks(body) {
        if (!body) {
            throw new Error('No Body')
        }
        return models.Library.find({ authorized });
    },
    findWhereBookExists(_id) {
        if (!_id) {
            throw new Error('No Id');
        }
        // return models.Library.find({ 'books._id': _id }).populate('books owners');
        return models.Library.aggregate([
            {
                $project: {
                    'library': '$$ROOT',
                    'books': '$$ROOT.books'
                }
            }
        ]);
    },
    createLibrary(body) {
        if (!body) {
            throw new Error('No body')
        }
        if (body.authorized && body.authorized.length) {
            for (let i = 0; i < body.authorized.length; i++) {
                const user = body.authorized[i]
                body.authorized[i] = mongoose.Types.ObjectId(user);
            }
        }
        if (body.owners && body.owners.length) {
            for (let i = 0; i < body.owners.length; i++) {
                const user = body.owners[i]
                body.owners[i] = mongoose.Types.ObjectId(user);
            }
        }
        const library = new models.Library(body);
        return library.save();
    },
    updateLibrary(body) {
        if (!body) {
            throw new Error('No body')
        }
       return models.Library.update( { _id: body.id }, body);
    },
    deleteLibrary(id) {
        if (!id || !id.length) {
            throw new Error('Id missing')
        }
        return models.Library.remove( { _id: id } );
    },
    addBook(body) {
        if (!body) {
            throw new Error('Body missing');
        }
        const { book } = body;
        const newBook = new models.Book(book);
        newBook.save((er, succ) => {
            if (er) {
                throw new Error('Error creating new book');
            }
            if (succ) {
                console.log('SUCC: ', succ);
                const bookId = succ._id;

                return models.Library.findOne({_id: body.library._id})
                    .then(lib => {
                        lib.books.push(bookId);
                        return lib.save();
                    })
                    .catch(err => {
                        throw new Error('Error finding library');
                    });
            }
            else {
                throw new Error('Error');
            }
        });
    }
}