import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 4,
};

const AddCoulmnModal = ({addColumn, setAddColumn, setNewColumnName, handleAddColumn}) => {
  const handleClose = () => setAddColumn(!addColumn);

  return (
    <Modal open={addColumn} onClose={handleClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          Add New Column
        </Typography>
        <input
          type="text"
          className="form-control"
          style={{margin: "18px 0px"}}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <div className="modal-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddColumn}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddCoulmnModal;
