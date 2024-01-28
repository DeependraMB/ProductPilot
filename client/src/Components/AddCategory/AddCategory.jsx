import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import AddSubcategory from "../AddSubcategory/AddSubcategory";

function AddCategory() {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-category/get-category")
      .then((res) => {
        console.log("Fetched categories:", res.data);
        setCategoryList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAddCategory = () => {
    axios
      .post("http://localhost:5000/api/categories/category", { category })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  const handleCategoryClick = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: "300px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "300px",
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            {categoryList.map((category) => (
              <ListItemButton
                key={category._id}
                onClick={() => handleCategoryClick(category)}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={category.category} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
       
      </Box>
       { selectedCategory ?
        <div style={{ marginLeft: "320px", padding: "20px" }}>
          <AddSubcategory category={selectedCategory} />
        </div> :
      <form method="POST">
        <div
          style={{
            marginTop: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="category"
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </div>
      </form> }
    </div>
  );
}

export default AddCategory;
