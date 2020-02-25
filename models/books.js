const db = require('../db');

const books = {
    getAll(callback) {
        return db.query('SELECT * from book', callback);
    },
    getById(id, callback) {
        return db.query('SELECT * FROM book WHERE id=?', [id], callback);
    },
};

module.exports = books;