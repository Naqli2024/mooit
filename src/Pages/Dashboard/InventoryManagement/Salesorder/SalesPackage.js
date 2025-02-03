import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import SalesPackageDetails from "./SalesPackageDetails";
const SalesPackage = ({ backToList }) => {
  const [openPackageDetails, setPackageDetails] = useState(false);


  const handleSavePackageDetails = () => {
    setPackageDetails(true);
  };


  return (
    <div>
      {openPackageDetails ? (
        <SalesPackageDetails
          backToList={() => setPackageDetails(!setPackageDetails)}
        />
      ) : (
        <div>
          <h2>New Package</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="sales-package-form">
            <div className="package-date-field">
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="custom-label">Package Slip</Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="custom-label">Date</Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      type="date"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="row invoice-table">
              <Table className="table-content sales-invoice-table">
                <thead>
                  <tr>
                    <th>Item & Description</th>
                    <th>Ordered</th>
                    <th>Packed</th>
                    <th>Quantity to pack</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      xxxxxxxxxxxxxxx <br />
                      SKU:657465
                    </td>
                    <td style={{ textAlign: "center",width: "100px" }}>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </td>
                    <td style={{ textAlign: "center",width: "100px" }}>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="package-save-cancel-btn">
              <button
                onClick={handleSavePackageDetails}
                type="submit"
                className="btn btn-primary save-download-btn"
              >
                Save
              </button>
              <button className="btn btn-danger sales-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default SalesPackage;