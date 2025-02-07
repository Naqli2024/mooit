import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Select from "react-select";
import { InputGroup, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import PackageDetails from "./PackageDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { filterCustomerAndSalesId } from "../../../../Helper/filterCustomerAndSalesId";
import { getPackageId } from "../../../../Redux/package/getPackageIdSlice";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { createNewPackage } from "../../../../Redux/package/createNewPackage";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import { getPackageDetails } from "../../../../Redux/package/getPackageDetails";

const NewPackage = ({ backToList }) => {
  const [packageDetails, setPackageDetails] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectSaleOrderId, setSelectSaleOrderId] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const { packageId } = useSelector((state) => state.packageId);
  const { loading } = useSelector((state) => state.newPackage);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { packageDetail } = useSelector((state) => state.getPackageDetails);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    customerName: null,
    salesOrderId: null,
    packageSlip: null,
    packageDate: "",
    itemDetails: [],
  });

  // Populate formData when saleOrderData or packageId changes
  useEffect(() => {
    if (saleOrderData && saleOrderData.itemDetails) {
      setFormData((prevState) => ({
        ...prevState,
        packageSlip: packageId || null,
        itemDetails: saleOrderData.itemDetails.map((item) => ({
          itemName: item.name || "",
          sku: saleOrderData?.sku || "",
          ordered: item.quantity || 0,
          packed: 0,
          quantity: 0,
        })),
      }));
    }
  }, [saleOrderData, packageId]);

  // Update formData when customer or salesOrder changes
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      customerName: selectedCustomer?.value || null,
      salesOrderId: selectedSalesOrder?.value || null,
    }));
  }, [selectedCustomer, selectedSalesOrder]);

  // Handle customer selection change
  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    if (selectedOption) {
      const filteredSalesOrders = allSaleOrder.filter(
        (order) => order.customerName === selectedOption.value
      );
      const salesOrderOptions = filteredSalesOrders.map((order) => ({
        label: order.salesOrderId,
        value: order.salesOrderId,
      }));

      const defaultOption = { label: "Select", value: "", isDisabled: true };
      setSelectSaleOrderId([defaultOption, ...salesOrderOptions]);
    } else {
      setSelectSaleOrderId([]);
    }
    setSelectedSalesOrder(null);
  };

  // Handle sales order selection change
  const handleSalesOrderChange = (selectedOption) => {
    setSelectedSalesOrder(selectedOption);
    if (selectedOption) {
      dispatch(getSaleOrderBySaleOrderId(selectedOption.value));
    }
  };

  // Handle item details field change
  const handleItemDetailChange = (index, field, value) => {
    setFormData((prevState) => {
      const updatedItemDetails = [...prevState.itemDetails];
      updatedItemDetails[index][field] = value;
      return {
        ...prevState,
        itemDetails: updatedItemDetails,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewPackage(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
        dispatch(getPackageDetails(response?.data?.packageSlip)).then(() => {
          setPackageDetails(true);
        });
        setFormData({
          customerName: null,
          salesOrderId: null,
          packageSlip: null,
          packageDate: "",
          itemDetails: [],
        });
        setSelectedCustomer(null);
        setSelectedSalesOrder(null);
        setSelectSaleOrderId([]);
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
      });
  };

  useEffect(() => {
    dispatch(getAllSalesOrder());
    dispatch(getPackageId());
  }, [dispatch]);

  // Process customer options for dropdown
  useEffect(() => {
    if (allSaleOrder) {
      const filteredData = filterCustomerAndSalesId(allSaleOrder);

      const customerOptions = filteredData
        ?.filter((customer) => customer.customerName)
        .map((customer) => ({
          label: customer.customerName,
          value: customer.customerName,
        }));

      const defaultOption = { label: "Select", value: "", isDisabled: true };

      setCategoryOptions([defaultOption, ...customerOptions]);

      if (!selectedCustomer && customerOptions.length > 0) {
        setSelectedCustomer(null); // Don't auto-select the first option
      }
    }
  }, [allSaleOrder]);

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      {packageDetails ? (
        <PackageDetails
          packageDetail={packageDetail?.data}
          backToList={() => setPackageDetails(!setPackageDetails)}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Package</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="new-package-form">
            <form onSubmit={handleSubmit}>
              <div className="new-package-name-sales mb-5">
                <Form.Group className="col-md-4 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Customer Name
                  </Form.Label>
                  <div className="form-group inventory-custom-dropdown">
                    <Select
                      options={categoryOptions}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                      value={selectedCustomer}
                      onChange={handleCustomerChange}
                      placeholder="Select"
                      isClearable={true}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="col-md-4 inventory-category-dropdown">
                  <Form.Label className="custom-label">Sales Order</Form.Label>
                  <div className="form-group inventory-custom-dropdown">
                    <Select
                      options={selectSaleOrderId}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                      placeholder="Select"
                      isClearable={true}
                      value={selectedSalesOrder}
                      onChange={handleSalesOrderChange}
                    />
                  </div>
                </Form.Group>
              </div>
              <hr />
              <div className="new-package-name-sales mb-4">
                <div className="col-md-4 mt-4">
                  <Form.Group>
                    <Form.Label className="custom-label">
                      Package Slip
                    </Form.Label>
                    <InputGroup className="mt-1">
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="packageId"
                        value={formData.packageSlip || ""}
                        readOnly
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-4 mt-4">
                  <Form.Group>
                    <Form.Label className="custom-label">Date</Form.Label>
                    <InputGroup className="mt-1">
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="packageReceipt"
                        type="date"
                        value={formData.packageDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            packageDate: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>
              <div className="row invoice-table mt-5">
                <Table className="table-content sales-invoice-table delivery-tableHeader">
                  <thead>
                    <tr>
                      <th className="item-name-text">Item Name</th>
                      <th>Ordered</th>
                      <th>Packed</th>
                      <th>Quantity to pack</th>
                      <th>Stock on hand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.itemDetails && formData.itemDetails.length > 0 ? (
                      formData.itemDetails.map((itemDetail, index) => (
                        <tr key={index}>
                          <td className="item-name-text">
                            {itemDetail.itemName} <br />
                            SKU: {saleOrderData?.sku}
                          </td>
                          <td style={{ textAlign: "center", width: "100px" }}>
                            <input
                              type="text"
                              className="form-control"
                              value={itemDetail.ordered || ""}
                              readOnly
                            />
                          </td>
                          <td style={{ textAlign: "center", width: "100px" }}>
                            <input
                              type="text"
                              className="form-control"
                              value={itemDetail.packed || ""}
                              onChange={(e) =>
                                handleItemDetailChange(
                                  index,
                                  "packed",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={itemDetail.quantity || ""}
                              onChange={(e) =>
                                handleItemDetailChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No sale order data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="container-fluid">
                <div className="row justify-content-center button-top-padding">
                  <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                    <button
                      type="submit"
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
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewPackage;
