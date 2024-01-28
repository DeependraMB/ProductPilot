const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db.js");
require("dotenv").config();
const categoryRoutes = require("../server/Routes/categoryRoutes");
const productRoutes = require("../server/Routes/productRoutes");
const subCategoryRoutes = require("../server/Routes/subCategoryRoutes.js");
const addProductRoutes = require("../server/Routes/addProductRoutes.js");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use('/api/get-category',categoryRoutes);
app.use("/api/add-subcategory",subCategoryRoutes);

app.use("/api/get-subcategory",subCategoryRoutes);

app.use("/api/add-products",addProductRoutes);
app.use("/api/get-products",addProductRoutes);

app.listen(PORT, () => {
    console.log("\x1b[44m\x1b[33m%s\x1b[0m", `Server is running on port ${PORT}`);
  });