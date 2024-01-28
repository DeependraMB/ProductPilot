const express = require('express');
const router = express.Router();
const Category = require('../Models/categoryModel');

// Create a new category
router.post('/category', async (req, res) => {
  try {
    const formData = req.body;
    if (!formData.category) {
      return res.status(400).json({ message: 'Name is required for a category' });
    }

    const existingCategory = await Category.findOne({ category: formData.category });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new SubCategory({
      category: formData.category,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/get-category",async (req,res)=>{
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;
