import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";

const CreatePurchase = ({ backToList }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <h2>Purchase</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="create-purchase">
        <div className="row create-purchase-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Product Name</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Vendor Name</Form.Label>
              <Form.Select className="mt-2 custom-textfield">
                <option></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </div>
          <hr className="mt-5"></hr>
        </div>
        <div className="create-purchase-heading">
          <div className="classification-text">Classification</div>
          <div onClick={handleOpen} className="edit-text">
            Edit
          </div>
        </div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { marginTop: 3 } }}
          noValidate
          autoComplete="off"
        >
          <div className="row all-textfield-spacing">
            <TextField
              className="textfield-spacing"
              id="part-number"
              label="Part number"
            />
            <TextField
              className="textfield-spacing"
              id="hns-code"
              label="HNS code"
            />
            <TextField className="textfield-spacing" id="sku" label="SKU" />
            <TextField
              className="textfield-spacing"
              id="quantity"
              label="Quantity"
            />
          </div>
          <div className="row all-textfield-spacing">
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="MRP"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Purchase rate"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Unit price"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="GST"
            />
          </div>
          <div className="row all-textfield-spacing">
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Advance amount"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Brand name"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Category"
            />
            <div className="textfield-spacing">
              <Form.Select className="classify-dropdown">
                <option>Warehouse</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="row all-textfield-spacing">
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Rack"
            />
            <div className="textfield-spacing">
              <Form.Select className="classify-dropdown">
                <option>Shelf</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Shelf space"
            />
            <div className="textfield-spacing">
              <Form.Select className="classify-dropdown">
                <option>Operation type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="row all-textfield-spacing">
            <div className="textfield-spacing">
              <Form.Select className="classify-dropdown">
                <option>Storage Condition</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Storage cost"
            />
            <TextField
              className="textfield-spacing"
              id="demo-helper-text-misaligned-no-helper"
              label="Storage date"
            />
            <div className="textfield-spacing">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: "100%" }}>
                  <DatePicker sx={{ width: "100%" }} label="Expiry date" />
                </Box>
              </LocalizationProvider>
            </div>
          </div>
          <div className="row invoice-textfield-spacing">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box className="Invoice-date-textfield" sx={{ width: "24%" }}>
                <DatePicker sx={{ width: "100%" }} label="Invoice date" />
              </Box>
            </LocalizationProvider>
            <TextField
              className="Invoice-no-textfield"
              id="demo-helper-text-misaligned-no-helper"
              label="Invoice no"
              sx={{ width: "24%" }}
            />
            <TextField
              className="Invoice-val-textfield"
              id="demo-helper-text-misaligned-no-helper"
              label="Invoice value"
              sx={{ width: "24%" }}
            />
          </div>
        </Box>
        <button className="print-barcode">
          <span>
            <LocalPrintshopIcon />
          </span>
          Print Barcode
        </button>
        <div className="container mt-4">
          <div className="col d-flex justify-content-center">
            <button type="button" className="btn submit-btn">
              Submit
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalStyle">
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
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Part number
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  HNS coder
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Quantity
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  MRP
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Purchase rate
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  GST
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Advance amount
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Brand name
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="modal-content">
              <div className="model-checkbox-text">
                <Checkbox />
                <Typography variant="body1" className="model-content">
                  Category
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <EditIcon className="edit-icon" />
                </IconButton>
                <IconButton aria-label="delete ">
                  <DeleteOutlineSharpIcon className="delete-icon" />
                </IconButton>
              </div>
            </div>
            <div className="container">
              <IconButton aria-label="add" className="plus-icon">
                <AddIcon />
              </IconButton>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreatePurchase;
