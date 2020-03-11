var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    title:  String,
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    ratings: {
        noOfStars: Number,
        comment: String,
    },
    isbn: String,
    dateOfPurchase: Date,
    language: String,
    publishDate: Date,
    publisher: String,
    notes: {
        notes: String,
        public: Boolean,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    categoryClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryClass',
    }],
    location: {
        shelf: String,
        row: Number,
    },
    purchaseReason: String,
    imageUrl: String,
});