import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import SubCategoryProducts from "./SubCategoryProducts";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import { createSubCategory, deleteCategory } from "../../../../Redux/category/categorySlice";
import {
  clearProductData,
  getPurchaseByproductName,
} from "../../../../Redux/features/getPurchaseByProductName";

const SubCategory = ({ backToList, selectedCategory, setSelectedCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSubCategoryProducts, setOpenSubCategoryProducts] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const dispatch = useDispatch();
  const { loading, category } = useSelector((state) => state.category);
  const { data } = useSelector((state) => state.getPurchaseByproductName);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (categoryIndex) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryIndex)
        ? prevSelected.filter((index) => index !== categoryIndex)
        : [...prevSelected, categoryIndex]
    );
  };

  const handleSelectAll = () => {
    setSelectedCategories(
      selectedCategories.length === selectedCategory.length
        ? []
        : selectedCategory.map((_, index) => index)
    );
  };

  const handleSubCategoryProducts = (subCategory) => {
    setOpenSubCategoryProducts(true);
    dispatch(clearProductData()); 
  
    const productNames = subCategory.productList || [];
    if (productNames.length > 0) {
      dispatch(getPurchaseByproductName(productNames));
    }
  };

  const handleCategoryClick = (id) => {
      dispatch(deleteCategory(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {position: "top-center", autoClose: 2000, closeButton: false})
      })
      .catch((error) => toast.error(error, {position: "top-center", autoClose: 2000, closeButton: false}))
    }

  const handleCreateSubcategory = (event) => {
    event.preventDefault();
    const payload = {
      categoryName: selectedCategory.title,
      subCategoryName: subCategoryName,
    };

    // Dispatch the createSubCategory action
    dispatch(createSubCategory(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setOpen(false);

        // Extract new subcategory from response
        const newSubCategory = {
          _id: response.data.subCategories[
            response.data.subCategories.length - 1
          ]._id, // Ensure _id is set
          name: subCategoryName,
          productList: [],
        };

        // Update state with the new subcategory
        setSelectedCategory((prevCategory) => ({
          ...prevCategory,
          subCategories: [...prevCategory.subCategories, newSubCategory],
        }));

        // Reset input field
        setSubCategoryName("");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  return (
    <div>
      {loading && <Loader />}
      {openSubCategoryProducts ? (
        <SubCategoryProducts
          backToList={() => setOpenSubCategoryProducts(false)}
          data = {data}
        />
      ) : (
        <div className="purchase-list">
          <h2>Category 1</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="package-text-field">
            <div className="d-md-flex"></div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setOpen(true)}
            >
              Create new
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                "& .MuiDialog-paper": {
                  width: "400px",
                  maxWidth: "80vw",
                },
              }}
            >
              <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
                <h2>New Category</h2>
              </DialogTitle>
              <DialogContent>
                <div className=" mt-3">
                  <Form.Group>
                    <Form.Label className="custom-label">
                      Enter Sub Category Name
                    </Form.Label>
                    <InputGroup className="mt-1">
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="packageReceipt"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  gap: "8px",
                  padding: "16px",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "normal",
                    paddingTop: "5px",
                    paddingBottom: "3px",
                    backgroundColor: "#1F3F7F",
                    textTransform: "capitalize",
                  }}
                  onClick={handleCreateSubcategory}
                >
                  Save
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "#CFCFCF",
                    color: "black",
                    fontWeight: "normal",
                    paddingTop: "5px",
                    paddingBottom: "3px",
                    textTransform: "capitalize",
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {selectedCategories.length > 0 && (
            <div className="select-all-btn" onClick={handleSelectAll}>
              {selectedCategories.length === selectedCategory.length
                ? "Deselect All"
                : "Select All"}
            </div>
          )}
          <div className="category-content mt-5">
            {Array.isArray(selectedCategory.subCategories) &&
              selectedCategory.subCategories.map((subCategory, index) => (
                <div
                  key={index}
                  className="category-card"
                  onClick={() => handleSubCategoryProducts(subCategory)}
                >
                  <div
                    className="checkbox-container"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                  {selectedCategories.includes(index) && (
                    <div className="delete-icon">
                      <RiDeleteBin6Line size={20} onClick={() => handleCategoryClick(category._id)} />
                    </div>
                  )}

                  {/* Correctly display sub-category name */}
                  <div className="fw-bold mb-4">
                    {subCategory?.name || "No Sub-Category"}
                  </div>

                  {/* Correctly calculate product count */}
                  <div>
                    {Array.isArray(subCategory?.productList)
                      ? subCategory.productList.length
                      : 0}
                    Products
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
