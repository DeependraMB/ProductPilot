// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../Models/productModel');
const { Category, addSubcategory } = require('../Models/categoryModel'); // Import the addSubcategory function

// Create a new product under a category (including nested subcategories)
router.post('/', async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newProduct = new Product({ name, category: categoryId });
    await newProduct.save();

    category.products.push(newProduct);
    await category.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get all products (including category and subcategory information)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
