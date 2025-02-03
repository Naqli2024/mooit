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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SubCategory = ({ backToList }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const categories = [
    { title: "Sub Category 1", count: 100 },
    { title: "Sub Category 2", count: 200 },
    { title: "Sub Category 3", count: 150 },
    { title: "Sub Category 4", count: 150 },
    { title: "Sub Category 5", count: 150 },
    { title: "Sub Category 6", count: 150 },
  ];
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
  return (
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
                  Enter Sub Category Name
                </Form.Label>
                <InputGroup className="mt-1">
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    name="packageReceipt"
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
              sx={{ fontWeight: "normal",paddingTop: "5px",paddingBottom: "3px" }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#CFCFCF",
                color: "black",
                fontWeight: "normal",
                paddingTop: "5px",paddingBottom: "3px"
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
      <div className="category-content">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedCategories.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
            {selectedCategories.includes(index) && (
              <div className="delete-icon">
                <RiDeleteBin6Line size={20} />
              </div>
            )}
            <div className="fw-bold mb-4">{category.title}</div>
            <div>{category.count} Products</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
