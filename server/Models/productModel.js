const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  category: String,
  subcategory: String,
  image: {
    type: String, // Assuming the image is stored as a URL, adjust accordingly if using file storage
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
