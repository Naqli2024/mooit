import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Table from "react-bootstrap/Table";
import { InputGroup, Form, Button } from "react-bootstrap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShipmentDetails from "./ShipmentDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import {
  createShipment,
  generateShipmentOrder,
} from "../../../../Redux/shipment/shipmentSlice";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { toast, ToastContainer } from "react-toastify";
import { getPackageDetails } from "../../../../Redux/package/getPackageDetails";

const ProductNewShipment = ({ backToList }) => {
  const [openShipmentDetails, setShipmentDetails] = useState(false);
  const dispatch = useDispatch();
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [salesOrder, setSalesOrder] = useState([]);
  const { data } = useSelector((state) => state.shipment);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const {packageDetail} = useSelector((state) => state.getPackageDetails);
  const isShipmentGenerated = useRef(false);
  const [formData, setFormData] = useState({
    customerName: "",
    salesOrderId: "",
    packageSlip: "",
    shipmentOrder: "",
    shipmentDate: "",
    carrier: "",
    shipmentCharges: 0,
    notes: "",
  });
  const [newShipmentData, setNewShipmentData] = useState();

  const handleChange = (selectedOption) => {
    setSalesOrder([]); // Reset sales orders before fetching new ones
    getSalesOrderId(selectedOption);
    setFormData({
      ...formData,
      customerName: selectedOption?.value || "",
      salesOrderId: "", 
      shipmentStatus: "Shipped",
    });
  };

  const getSalesOrderId = (selectedOption) => {
    if (!selectedOption) return;
    const filterSaleOrder = allSaleOrder
      ?.filter((saleOrder) => saleOrder.customerName === selectedOption.value)
      .map((item) => ({ value: item.salesOrderId, label: item.salesOrderId }));

    setSalesOrder(filterSaleOrder);
  };

  const getCustomerNameFromSaleOrder = () => {
    if (!Array.isArray(allSaleOrder)) return;
    const customerName = allSaleOrder
      ?.map((customer) => customer.customerName)
      .filter((filtered) => filtered !== "undefined" && filtered !== undefined);
    const customerNamesArray = customerName?.map((name) => ({
      value: name,
      label: name,
    }));
    setCategoryOptions(customerNamesArray);
  };

  const handleSalesOrderChange = (selectedOption) => {
    setFormData({
      ...formData,
      salesOrderId: selectedOption?.value || "", // Set the salesOrderId correctly
    });
  };

  useEffect(() => {
    dispatch(getAllSalesOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!isShipmentGenerated.current) {
      dispatch(generateShipmentOrder());
      isShipmentGenerated.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if(saleOrderData) {
      dispatch(getPackageDetails(saleOrderData?.salesOrderId));
    }
  },[dispatch, saleOrderData])

  // Update the form value with the shipment order when the API response arrives
  useEffect(() => {
    if (data && data.success && typeof data.data === "string") {
      setFormData((prev) => ({
        ...prev,
        shipmentOrder: data.data,
      }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(getSaleOrderBySaleOrderId(formData.salesOrderId));
  }, [dispatch, formData.salesOrderId]);

  useEffect(() => {
    if (allSaleOrder?.length) {
      getCustomerNameFromSaleOrder();
    }
  }, [allSaleOrder]);

  const handleSaveNewShipmentDetails = (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      packageSlip: packageDetail?.data?.packageSlip,
      shipmentCharges: saleOrderData?.shipmentCharges,
    };

    // Dispatch action to create shipment
    dispatch(createShipment(payload))
      .unwrap()
      .then((response) => {
        // Show success toast message
        toast.success(response.message, {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });

        setTimeout(() => {
          setShipmentDetails(true);
          setNewShipmentData(response.data);
        }, 3000); // 2-second delay for UI transition
      })
      .catch((error) => {
        toast.dismiss()
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  return (
    <div>
      {openShipmentDetails ? (
        <ShipmentDetails
          backToList={() => setShipmentDetails(false)}
          newShipmentData={newShipmentData}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Shipments</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="new-package-form">
            <div className="new-package-name-sales mb-4">
              <Form.Group className="col-md-5 customer-name-dropdown">
                <Form.Label className="custom-label">Customer name</Form.Label>
                <div className="form-group inventory-custom-dropdown">
                  <Select
                    options={categoryOptions}
                    onChange={handleChange}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    value={
                      formData.customerName && {
                        value: formData.customerName,
                        label: formData.customerName,
                      }
                    } // Set value as an object
                  />
                </div>
              </Form.Group>
              <Form.Group className="col-md-5 customer-name-dropdown me-md-5">
                <Form.Label className="custom-label">Sales order</Form.Label>
                <div className="form-group inventory-custom-dropdown">
                  <Select
                    options={salesOrder}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    value={
                      salesOrder.find(
                        (order) => order.value === formData.salesOrderId
                      ) || ""
                    } // Set value correctly
                    onChange={handleSalesOrderChange}
                  />
                </div>
              </Form.Group>
            </div>
            <hr />
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <Form.Label className="custom-label">Package Slip</Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      value={packageDetail?.data?.packageSlip}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-3 form-right-field">
                <Form.Group>
                  <Form.Label className="custom-label">
                    Shipment order
                  </Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      value={formData.shipmentOrder}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-4">
                <Form.Group>
                  <Form.Label className="custom-label">
                    Shipment date
                  </Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      type="date"
                      value={formData.shipmentDate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          shipmentDate: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-4 form-right-field">
                <Form.Group>
                  <Form.Label className="custom-label">Carrier</Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      value={formData.carrier}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          carrier: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-4">
                <Form.Group>
                  <Form.Label className="custom-label">
                    Shipment amount
                  </Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      value={saleOrderData?.shipmentCharges}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-4 form-right-field">
                <Form.Group>
                  <Form.Label className="custom-label">Notes</Form.Label>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="packageReceipt"
                      value={formData.notes}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          notes: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center button-top-padding">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    onClick={handleSaveNewShipmentDetails}
                    className="btn flex-grow-1"
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
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductNewShipment;
