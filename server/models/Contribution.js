const mongoose = require('mongoose');
const { Schema } = mongoose;

const contributionSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Contribution = mongoose.model('Contribution', contributionSchema);

module.exports = Contribution;