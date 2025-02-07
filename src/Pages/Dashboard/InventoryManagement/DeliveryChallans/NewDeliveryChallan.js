import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Select from "react-select";
import { InputGroup, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { useDispatch, useSelector } from "react-redux";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { challanTypeOptions } from "../../../../Data/challanTypeOptions";
import {
  createDeliveryChallan,
  generateDeliveryChallan,
  getAllChallans,
} from "../../../../Redux/deliveryChallan/deliveryChallanSlice";
import { ToastContainer, toast } from "react-toastify";

const NewDeliveryChallan = ({ backToList }) => {
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [salesOrder, setSalesOrder] = useState([]);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const [formData, setFormData] = useState({
    customerName: null,
    salesOrderId: null,
    deliveryChallan: "",
    deliveryChallanDate: "",
    expectedDeliveryDate: "",
    challanType: "",
    itemDetails: [],
  });

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

  const handleChange = (selectedOption) => {
    setSalesOrder([]); // Reset sales orders before fetching new ones
    getSalesOrderId(selectedOption);
    setFormData({
      ...formData,
      customerName: selectedOption?.value || "",
      salesOrderId: "",
    });
  };

  const handleSalesOrderChange = (selectedOption) => {
    setFormData({
      ...formData,
      salesOrderId: selectedOption?.value || "", // Set the salesOrderId correctly
    });
    if (selectedOption?.value) {
      dispatch(getSaleOrderBySaleOrderId(selectedOption.value));
    }
  };

  const handleSaveNewDeliveryChallan = (event) => {
    event.preventDefault();
    dispatch(createDeliveryChallan(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => {
          backToList();
        }, 1000);
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  };

  useEffect(() => {
    if (saleOrderData?.itemDetails?.length) {
      setFormData((prev) => ({
        ...prev,
        itemDetails: saleOrderData.itemDetails,
      }));
    }
  }, [saleOrderData]);

  useEffect(() => {
    dispatch(getSaleOrderBySaleOrderId(formData.salesOrderId));
  }, [dispatch, formData.salesOrderId]);

  useEffect(() => {
    if (allSaleOrder?.length) {
      getCustomerNameFromSaleOrder();
    }
  }, [allSaleOrder]);

  useEffect(() => {
    dispatch(getAllSalesOrder());
    dispatch(generateDeliveryChallan()).then((response) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        deliveryChallan: response.payload.data,
      }));
    });
  }, [dispatch]);

  return (
    <div className="purchase-list">
      <h2>New Delivery Challans</h2>
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
                }
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
        <div className="sales-order-bill mb-4">
          <div className="fw-bold">Shipping address</div>
          <div>xxxxxxxxxxxx</div>
          <div>xxxxxxxxxxxx</div>
          <div>xxxxxxxxxxxx</div>
        </div>
        <div className="new-delivery-form mb-4 mt-5">
          <div className="col-md-4">
            <Form.Group>
              <Form.Label className="custom-label">Delivery challan</Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="deliveryChallan"
                  value={formData.deliveryChallan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryChallan: e.target.value,
                    })
                  }
                  readOnly
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-4 form-right-field">
            <Form.Group>
              <Form.Label className="custom-label">
                Delivery challan date
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="deliveryChallanDate"
                  type="date"
                  value={formData.deliveryChallanDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryChallanDate: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="new-delivery-form mb-4">
          <div className="col-md-4">
            <Form.Group>
              <Form.Label className="custom-label">
                Expected delivery date
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  type="date"
                  name="expectedDeliveryDate"
                  value={formData.expectedDeliveryDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expectedDeliveryDate: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-4 form-right-field">
            <Form.Group className="delivery-dropdown">
              <Form.Label className="custom-label">Challan type</Form.Label>
              <div className="form-group inventory-custom-dropdown mt-1">
                <Select
                  options={challanTypeOptions}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "45px",
                    }),
                  }}
                  name="challanType"
                  value={challanTypeOptions.find(
                    (option) => option.value === formData.challanType
                  )}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      challanType: selectedOption.value,
                    })
                  }
                />
              </div>
            </Form.Group>
          </div>
        </div>
        <div className="row invoice-table">
          <Table className="table-content sales-invoice-table delivery-tableHeader">
            <thead>
              <tr>
                <th>#</th>
                <th className="item-name-text">Item name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {saleOrderData?.itemDetails.length > 0 ? (
                saleOrderData?.itemDetails?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="item-name-text">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.gst}%</td>
                    <td>{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No sale order data available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="container-fluid mt-5">
          <div className="row button-top-padding">
            <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
              <button
                type="submit"
                onClick={handleSaveNewDeliveryChallan}
                className="btn flex-grow-1"
                style={{ color: "white", backgroundColor: "#1F3F7F" }}
              >
                Save as draft
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
      <ToastContainer />
    </div>
  );
};

export default NewDeliveryChallan;
