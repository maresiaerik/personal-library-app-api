const mongoose = require('mongoose');
const models = require('../models');

module.exports = {
    getLibraryById(id) {
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
        if (!user) {
            throw new Error('User missing');
        }
        const _id = mongoose.Types.ObjectId(user._id);
        const query = {
            $or: [
                {
                    owners: {
                        $in: _id,
                    }
                },
                {
                    authorized: {
                        $in: _id,
                    }
                },
            ]
        }
        return models.Library.find(query).populate('owners authorized');
    },
    getBooksByAuthor(authorId) {
        if (!authorId || !authorId.length) {
            throw new Error('User missing');
        }
        const _id = mongoose.Types.ObjectId(authorId); 

        return models.Library.find({}, 'name owners books').populate('owners books')
            .then(lib => {
                const data = [];
                for (let i = 0; i < lib.length; i++) {
                    const library = lib[i];
                    const { books } = lib[i];
                    for (let j = 0; j < books.length; j++) {
                        const { authors } = books[j]
                        for (let k = 0; k < authors.length; k ++){
                            if (String(authors[k]) === authorId) {
                                const { _id, name, owners: ow } = library;
                                const owners = ow.map(({_id, username}) => ({ _id, username }));
                                const payload = {
                                    books: books[j],
                                    library: {
                                        _id,
                                        name,
                                        owners,
                                    }
                                }
                                data.push(payload);
                            }
                        }
                    }
                }
                return data;
            })
            .catch(err => console.log(err));

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
        return models.Library.find({ public: true }, '_id name books owners').populate({ path: 'books', match: { _id } }).populate('owners');
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