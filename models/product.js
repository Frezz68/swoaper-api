const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  about: String,
  pathToImage: String,
  images: [String],
  size: Number,
  favoris: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fav',
    },
  ],
  notices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notice',
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  filters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Filter',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
