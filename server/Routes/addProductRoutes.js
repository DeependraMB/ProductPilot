const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../Models/productModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/add-products', upload.single('image'), async (req, res) => {
  const { productName, category, subcategory } = req.body;
  const imagePath = req.file ? req.file.path : ''; 

  const product = new Product({
    productName,
    category,
    subcategory,
    image: imagePath,
  });

  try {
    const newProduct = await product.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
