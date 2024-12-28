import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";

const CreateNewItems = ({ backToList }) => {
  return (
    <div>
      <div className="purchase-list">
        <h2>New Items</h2>
      </div>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="newItems-content">
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Item Name</Form.Label>
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
              <Form.Label className="custom-label">Quantity</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">SKU</Form.Label>
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
              <Form.Label className="custom-label">HNS code</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Brand Name</Form.Label>
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
              <Form.Label className="custom-label">Category</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="fw-bold mb-4">Storage Location</div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Warehouse name</Form.Label>
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
              <Form.Label className="custom-label">Rack</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Shelf</Form.Label>
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
              <Form.Label className="custom-label">Shelf space</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">
                Storage condition
              </Form.Label>
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
              <Form.Label className="custom-label">Storage date</Form.Label>
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": { height: "45px" },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </div>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Expiry date</Form.Label>
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": { height: "45px" },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </div>
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Location</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="fw-bold mb-4">Purchase information</div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">MRP</Form.Label>
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
              <Form.Label className="custom-label">Purchase amount</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="newItems-textfield">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Unit price</Form.Label>
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
              <Form.Label className="custom-label">GST</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="fw-bold mb-4">Sales information</div>
        <div className="col-md-5 mb-4">
          <Form.Group>
            <Form.Label className="custom-label">Sale price</Form.Label>
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
            <Form.Label className="custom-label">Description</Form.Label>
            <InputGroup className="mt-2">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="description-textfield"
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="fw-bold mb-4 mt-4">Inventory tracking</div>
        <div className="col-md-5 mb-4">
          <Form.Group>
            <Form.Label className="custom-label">Opening inventory</Form.Label>
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
            <Form.Label className="custom-label">Restock point</Form.Label>
            <InputGroup className="mt-2">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="save-cancel-btn">
        <button type="button" className="btn newItems-save-btn">
          Save
        </button>
        <button type="button" className="btn newItems-cancel-btn">
          Cancel
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default CreateNewItems;
