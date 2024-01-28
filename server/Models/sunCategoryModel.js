const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  parentcategory: {
    type: String,
  },
  subcategories: {
    type: String,
  },
});

const SubCategory = mongoose.model('SubCategory', categorySchema);

module.exports = SubCategory;
