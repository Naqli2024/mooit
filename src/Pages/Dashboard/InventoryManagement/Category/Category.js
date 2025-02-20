import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
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
import SubCategory from "./SubCategory";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory, deleteCategory, getAllCategories } from "../../../../Redux/category/categorySlice";
import Loader from "../../../../Helper/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Category = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const {loading, category} = useSelector((state) => state.category);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName("")
  };

  const handleOpenSubCategory = (index) => {
    const clickedCategory = categories[index]; 
    setSelectedCategory(clickedCategory); 
    setOpenSubCategory(true);
  };

  const handleCheckboxChange = (categoryIndex) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryIndex)
        ? prevSelected.filter((index) => index !== categoryIndex)
        : [...prevSelected, categoryIndex]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((_, index) => index));
    }
  };

  const backToList = () => {
    setOpenSubCategory(false);
  };

  const handleCategoryClick = (id) => {
    dispatch(deleteCategory(id))
    .unwrap()
    .then((response) => {
      toast.success(response.message, {position: "top-center", autoClose: 2000, closeButton: false})
    })
    .catch((error) => toast.error(error, {position: "top-center", autoClose: 2000, closeButton: false}))
  }

  const handleCategoryName = (event) => {
    event.preventDefault();
    const payload = {
      "categoryName": categoryName
    }
    dispatch(createCategory(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
        setCategoryName("")
        setOpen(false);
      }
      )
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  };

  useEffect(() => {
    dispatch(getAllCategories());
  },[dispatch])

  useEffect(() => {
    if (category && category.length > 0) {
      const transformedCategories = category.map(cat => {
        // Capitalize category name
        const capitalizedTitle = cat.categoryName.charAt(0).toUpperCase() + cat.categoryName.slice(1);
  
        // Filter subcategories that have at least one product
        const validSubCategories = cat.subCategories
          .map(sub => ({
            ...sub,
            name: sub.name.charAt(0).toUpperCase() + sub.name.slice(1),  // Capitalize subcategory name
            productList: sub.productList ? sub.productList.map(prod => prod.charAt(0).toUpperCase() + prod.slice(1)) : []  // Capitalize products in subcategories
          }));
  
        // Collect all products from valid subcategories
        const allProducts = validSubCategories.flatMap(sub => sub.productList);
  
        return {
          title: capitalizedTitle,  
          count: validSubCategories.length, 
          subCategories: validSubCategories, 
          productList: allProducts, 
          productListCount: allProducts.length,
          _id: cat._id
        };
      });
  
      setCategories(transformedCategories);
    }
  }, [category]);

  return (
    <div>
      {loading && <Loader />}
      {openSubCategory ? (
        <SubCategory backToList={backToList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      ) : (
        <div className="purchase-list">
          <h2>Category</h2>
          <div className="package-text-field">
            <div className="d-md-flex"></div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={handleClickOpen}
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
                      Enter Category Name
                    </Form.Label>
                    <InputGroup className="mt-1">
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="packageReceipt"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                  className="btn-primary"
                  sx={{
                    fontWeight: "normal",
                    paddingTop: "5px",
                    paddingBottom: "3px",
                  }}
                  onClick={handleCategoryName}
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
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {selectedCategories.length > 0 && (
            <div className="select-all-btn" onClick={handleSelectAll}>
              {selectedCategories.length === categories.length
                ? "Deselect All"
                : "Select All"}
            </div>
          )}
          <div className="category-content mt-5">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => handleOpenSubCategory(index)}
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
                    <RiDeleteBin6Line size={20} onClick={() => handleCategoryClick(category._id)}/>
                  </div>
                )}
                <div className="fw-bold mb-4">{category.title}</div>
                <div>{category.count} Products</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
