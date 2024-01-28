const express = require("express");
const router = express.Router();
const SubCategory = require("../Models/sunCategoryModel");

router.post("/add-subcategory", async (req, res) => {
  try {
    const formData = req.body;
    console.log("FFF", formData.subCategory);

    const newCategory = new SubCategory({
      parentcategory: formData.parentCategory.category,
      subcategories: formData.subCategory,
    });
    console.log(newCategory);
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/get-subcategory",async (req,res)=>{
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;
