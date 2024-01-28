import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null); // New state for image file
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('image', image);

    axios.post('http://localhost:5000/api/add-products/add-products', formData)
      .then(response => console.log('Product added successfully'))
      .catch(error => console.error('Error adding product', error));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Filter subcategories based on the selected category
    const filteredSubcategories = subCategoryList.filter(
      (subCat) => subCat.parentcategory === e.target.value
    );
    setSubCategoryList(filteredSubcategories);
  };

  const handleImageChange = (e) => {
    // Set the selected image file
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/get-category/get-category')
      .then((res) => {
        console.log('Fetched categories:', res.data);
        setCategoryList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    axios
      .get('http://localhost:5000/api/get-subcategory/get-subcategory')
      .then((res) => {
        console.log('Dee', res);
        setSubCategoryList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add Product</h2>
      <div>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={handleCategoryChange}
        >
          {categoryList.map((cat) => (
            <MenuItem key={cat._id} value={cat.category}>
              {cat.category}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          select
          label="Subcategory"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          {subCategoryList.map((subCat) => (
            <MenuItem key={subCat._id} value={subCat.subcategories}>
              {subCat.subcategories}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default AddProduct;
