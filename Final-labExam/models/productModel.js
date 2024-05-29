const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

// Create the model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;