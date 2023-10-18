const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
