import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SalesShipmentDetails from "./SalesShipmentDetails";
import { Col, Row } from "react-bootstrap";
const SalesShipment = ({ backToList }) => {
  const [openSalesShipmentDetails, setSalesShipmentDetails] = useState(false);
  const handleSaveShipmentDetails = () => {
    setSalesShipmentDetails(true);
  };
  return (
    <div>
      {openSalesShipmentDetails ? (
        <SalesShipmentDetails
          backToList={() => setSalesShipmentDetails(!setSalesShipmentDetails)}
        />
      ) : (
        <div>
          <h2>New Shipment</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="sales-shipment">
            <div className="shipment-outer-border">
              <Row className="row-cols-auto justify-content-between  m-md-4 sales-order-date">
                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Package</Form.Label>
                    <Form.Control className="sales-order-label" type="text" />
                  </Form.Group>
                </Col>


                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Shipment Order</Form.Label>
                    <Form.Control className="sales-order-label" type="text" />
                  </Form.Group>
                </Col>


                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Shipment Date</Form.Label>
                    <Form.Control className="sales-order-label" type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="row-cols-auto justify-content-between m-md-4 sales-order-date">
                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Carrier</Form.Label>
                    <Form.Control className="sales-order-label" type="text" />
                  </Form.Group>
                </Col>


                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Shipment Charges</Form.Label>
                    <Form.Control className="sales-order-label" type="text" />
                  </Form.Group>
                </Col>
                <Col md="3" sm="12" xs="12"></Col>
              </Row>
              <div className="package-save-cancel-btn">
                <button
                  onClick={handleSaveShipmentDetails}
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
        </div>
      )}
    </div>
  );
};


export default SalesShipment;