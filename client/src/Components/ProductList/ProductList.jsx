import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your API endpoint
    axios.get('http://localhost:5000/api/get-products/get-products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Paper elevation={3}>
        <List>
          {products.map((product) => (
            <ListItem key={product._id} divider>
              <ListItemText
                primary={product.productName}
                secondary={`Category: ${product.category}, Subcategory: ${product.subcategory}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default ProductList;
