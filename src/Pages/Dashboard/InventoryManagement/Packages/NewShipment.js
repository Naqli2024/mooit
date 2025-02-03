import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PackageShipmentDetails from "./PackageShipmentDetails";
import {
  createShipment,
  generateShipmentOrder,
} from "../../../../Redux/shipment/shipmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { toast, ToastContainer } from "react-toastify";

const NewShipment = ({ backToList, packageDetail }) => {
  const [openPackagesShipmentDetails, setPackagesShipmentDetails] =
    useState(false);
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const [shipmentData, setShipmentData] = useState();
  const [formValues, setFormValues] = useState({
    shipmentOrder: "",
    shipmentDate: "",
    carrier: "",
    shipmentCharges: "",
    notes: "",
  });
  const isShipmentGenerated = useRef(false);

  const handleSavePackagesShipmentDetails = () => {
    const payload = {
      ...formValues,
      customerName: packageDetail.customerName,
      salesOrderId: packageDetail.salesOrderId,
      packageSlip: packageDetail.packageSlip,
      shipmentCharges: Number(saleOrderData?.shipmentCharges),
      shipmentStatus: "Shipped",
    };
    dispatch(createShipment(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          setShipmentData(response.data)
          setPackagesShipmentDetails(true);
        }, 2000);
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  useEffect(() => {
    if(!isShipmentGenerated.current) {
      dispatch(generateShipmentOrder());
      isShipmentGenerated.current = true;
    }
  }, [dispatch]);

  // Update the form value with the shipment order when the API response arrives
  useEffect(() => {
    if (data && data.success && typeof data.data === "string") {
      setFormValues((prevValues) => ({
        ...prevValues,
        shipmentOrder: data.data,
      }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(getSaleOrderBySaleOrderId(packageDetail?.salesOrderId));
  }, [dispatch]);

  return (
    <div>
      {openPackagesShipmentDetails ? (
        <PackageShipmentDetails
          backToList={() =>
            setPackagesShipmentDetails(!setPackagesShipmentDetails)
          }
          shipmentData={shipmentData}
        />
      ) : (
        <div className="purchase-list">
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
                    <Form.Control
                      className="sales-order-label"
                      type="text"
                      value={packageDetail.packageSlip}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Shipment order</Form.Label>
                    <Form.Control
                      className="sales-order-label"
                      type="text"
                      value={formValues.shipmentOrder}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Shipment date</Form.Label>
                    <Form.Control
                      className="sales-order-label"
                      type="date"
                      value={formValues.shipmentDate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          shipmentDate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="row-cols-auto justify-content-between m-md-4 sales-order-date">
                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3 mt-5">
                    <Form.Label>Carrier</Form.Label>
                    <Form.Control
                      className="sales-order-label"
                      type="text"
                      value={formValues.carrier}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          carrier: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="3" sm="12" xs="12">
                  <Form.Group className="mb-3 mt-5">
                    <Form.Label>Shipping charges</Form.Label>
                    <Form.Control
                      className="sales-order-label"
                      type="text"
                      value={saleOrderData?.shipmentCharges}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md="3" sm="12" xs="12"></Col>
              </Row>
              <div className="container-fluid">
                <div className="row justify-content-center button-top-padding">
                  <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                    <button
                      type="submit"
                      className="btn flex-grow-1"
                      onClick={handleSavePackagesShipmentDetails}
                      style={{ color: "white", backgroundColor: "#1F3F7F" }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger flex-grow-1"
                      onClick={backToList}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewShipment;
