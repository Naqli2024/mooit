import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const CreatePurchase = ({ openCreatePurchase }) => {
  return (
    <>
      <button onClick={openCreatePurchase} className="goBack-btn">
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
        <div className="row create-purchase-heading">
          <div className="col-md-10 fs-4 fw-bold">Classification</div>
          <div className="col-md-2 edit-text">Edit</div>
        </div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { marginTop: 3 } }}
          noValidate
          autoComplete="off"
        >
          <div className="row first-row-textfield">
            <div className="col-md-3">
              <TextField id="part-number" label="Part number" sx={{ width: "90%" }}/>
            </div>
            <div className="col-md-3">
              <TextField id="hns-code" label="HNS code" sx={{ width: "90%" }} />
            </div>
            <div className="col-md-3">
              <TextField id="sku" label="SKU" sx={{ width: "90%" }} />
            </div>
            <div className="col-md-3">
              <TextField id="quantity" label="Quantity" sx={{ width: "90%" }} />
            </div>
          </div>
          <div className="row first-row-textfield">
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="MRP"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Purchase rate"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Unit price"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="GST"
                sx={{ width: "90%" }}
              />
            </div>
          </div>
          <div className="row first-row-textfield">
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Advance amount"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Brand name"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Category"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
            <Form.Select className="classify-dropdown">
                <option>Warehouse</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="row first-row-textfield">
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Rack"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Shelf"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Shelf space"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Operation type"
                sx={{ width: "90%" }}
              />
            </div>
          </div>
          <div className="row first-row-textfield">
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Storage condition"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Storage date"
                sx={{ width: "90%" }}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Expiry date"
                sx={{ width: "90%" }}
              />
            </div>
          </div>
        </Box>
        <button className="print-barcode">
        <span>
          <LocalPrintshopIcon/>
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
    </>
  );
};

export default CreatePurchase;
