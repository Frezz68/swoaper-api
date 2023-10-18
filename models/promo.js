const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  codePromo: {
    type: String,
    required: true,
  },
  valuePromo: {
    type: Number,
    required: true,
  },
});

const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;
