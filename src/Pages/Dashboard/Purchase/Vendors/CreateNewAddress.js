import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
const CreateNewAddress = ({backToList}) => {
  return (
    <div>
      <div className="vendor-address-overview new-vendor-address">
        <div className="new-vendor-address-left-content">
          <div className="fw-bold">
            Billing address
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Country</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">State</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">City</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Street</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Zip code</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Phone no</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
        </div>
        <div className="new-vertical-divider"></div>
        <div className="new-vendor-address-right-content">
          <div className="fw-bold">
            Shipping address
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Country</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">State</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">City</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Street</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Zip code</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
          <div className="new-vendor-content">
            <div className="col-md-8">Phone no</div>
            <div className="col-md-8">
            <InputGroup className="col-md-4">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="packageReceipt"
              />
            </InputGroup>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="container-fluid p-4">
        <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
          <button
            type="submit"
            className="btn flex-grow-1"
            style={{ color: "white", backgroundColor: "#1F3F7F" }}
          >
            Save
          </button>
          <button className="btn btn-danger flex-grow-1" onClick={backToList}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAddress;
