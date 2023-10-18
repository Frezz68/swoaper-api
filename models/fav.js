const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;
