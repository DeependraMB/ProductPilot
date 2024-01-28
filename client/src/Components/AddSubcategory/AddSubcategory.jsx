import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import axios from "axios";

function createData(no, subCategory, parentCategory) {
  return { no, subCategory, parentCategory };
}

export default function AddSubcategory({ category }) {
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleAddSubCategory = () => {
    if (subCategory.trim() !== "") {
      axios
        .post("http://localhost:5000/api/add-subcategory/add-subcategory", {
          subCategory,
          parentCategory: category,
        })
        .then((response) => {
          const { subCategory, parentCategory } = response.data;
          const updatedList = [
            ...subCategoryList,
            createData(subCategoryList.length + 1, subCategory, parentCategory),
          ];
          setSubCategoryList(updatedList);
          setSubCategory("");
          console.log("Subcategory added to the database:", response.data);
        })
        .catch((error) => {
          console.error("Error adding subcategory to the database:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-subcategory/get-subcategory")
      .then((res) => {
        console.log("Dee", res);
        setSubCategoryList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, [subCategoryList]);

  return (
    <div style={{ marginTop: "40px", marginBottom: "20px" }}>
      <TextField
        id="subCategory"
        label="SubCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "blue", color: "white", marginTop: 2 }}
        onClick={handleAddSubCategory}
      >
        Add Subcategory
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>SubCategory</TableCell>
              <TableCell>Parent Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategoryList.map((row, index) => {
              console.log("Row:", row);
              console.log("Category:", category);

              if (row.parentcategory === category.category) {
                console.log("Matched!");

                return (
                  <TableRow
                    key={index + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.subcategories}</TableCell>
                    <TableCell>{row.parentcategory}</TableCell>
                  </TableRow>
                );
              } else {
                console.log("Not Matched!");
                return null;
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
