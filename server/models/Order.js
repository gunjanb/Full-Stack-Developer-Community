const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  contributions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contribution'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
