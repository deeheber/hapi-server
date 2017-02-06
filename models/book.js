const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  purchaseDate: {
    type: Date, default: Date.now
  },
  complete: {
    type: Boolean, default: false
  }
});

module.exports = mongoose.model('Book', book);