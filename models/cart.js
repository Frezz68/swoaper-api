const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
