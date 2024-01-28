import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const HomeBoxes = () => {
  return (
    <div style={{height: "50vh"}}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "30px",
          // Adjust the gap between boxes
        }}
      >
        {/* First Box */}
        <Paper elevation={3} sx={{ padding: 2, height: "100%", flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Add Category
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add Category for adding products
          </Typography>
          <Link to={"/add-category"} style={{ textDecoration: "none" }}>
            <Typography variant="body2" color="primary" mt={2}>
              Go to Add Category
            </Typography>
          </Link>
        </Paper>

        {/* Second Box */}
        <Paper elevation={3} sx={{ padding: 2, height: "100%", flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Add Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add Product for adding products
          </Typography>
          <Link to={"/add-products"} style={{ textDecoration: "none" }}>
            <Typography variant="body2" color="primary" mt={2}>
              Go to Add Product
            </Typography>
          </Link>
        </Paper>

        {/* Third Box */}
        <Paper elevation={3} sx={{ padding: 2, height: "100%", flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Product List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To view the product list
          </Typography>
          <Link to={"/product-list"} style={{ textDecoration: "none" }}>
            <Typography variant="body2" color="primary" mt={2}>
              Go to Product List
            </Typography>
          </Link>
        </Paper>
      </Box>
    </div>
  );
};

export default HomeBoxes;
