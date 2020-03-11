var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    name: String,
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    }],
});