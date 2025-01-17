import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import AddIcon from "@mui/icons-material/Add";

const EditModal = ({
  open,
  handleClose,
  purchaseData,
  dynamicFields,
  handleAddField,
  handleEditField,
  handleDeleteField,
}) => {
  const [tempData, setTempData] = useState({ ...purchaseData });
  const [newFieldName, setNewFieldName] = useState("");
  const [showNewFieldInput, setShowNewFieldInput] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setTempData({
      [fieldName]: value,
    });
  };

  const handleSaveChanges = () => {
    handleEditField(tempData);
    handleClose();
    handleAddNewField();
  };

  const handleAddNewField = () => {
    if (newFieldName.trim() && !tempData[newFieldName]) {
      handleAddField(newFieldName);
      setNewFieldName("");
      setShowNewFieldInput(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modalStyle"
        sx={{
          width: "600px",
          height: "80vh",
          overflowY: "scroll",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <div className="modal-title">
          <Typography id="modal-modal-title" className="modal-title">
            Edit
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ padding: 0 }}
          >
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>

        <Box id="modal-modal-description">
          {/* Render the regular fields from purchaseData */}
          {Object.keys(purchaseData).map((field) => (
            <div key={field} className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox
                  checked={true}
                  onChange={(e) =>
                    handleFieldChange(field, e.target.checked ? "checked" : "")
                  }
                />
                <Typography variant="body1" className="model-content">
                  {field}
                </Typography>
              </div>
              <div>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    const newValue = prompt(
                      `Edit ${field}`,
                      tempData[field] || ""
                    );
                    if (newValue !== null) {
                      handleFieldChange(field, newValue);
                    }
                  }}
                >
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteField(field)}
                >
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
          ))}

          {/* Render "+" icon to add new field */}
          {!showNewFieldInput && (
            <div className="container">
              <IconButton
                aria-label="add"
                className="plus-icon"
                onClick={() => setShowNewFieldInput(true)} // Show the input field when clicked
              >
                <AddIcon />
              </IconButton>
            </div>
          )}

          {/* Render input for new field when showNewFieldInput is true */}
          {showNewFieldInput && (
            <div className="modal-content">
              <TextField
                label="New Field Name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
          )}
          {/* Save changes button */}
          <div className="container mt-3">
            <div className="col d-flex justify-content-center">
              <button onClick={handleSaveChanges} className="btn submit-btn">
                Save Changes
              </button>
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
