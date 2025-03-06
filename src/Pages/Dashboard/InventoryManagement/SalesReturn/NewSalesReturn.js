import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Table from "react-bootstrap/Table";
import NewSalesReturnDetails from "./NewSalesReturnDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newSalesReturnSchema } from "../../../../Helper/validation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterCustomerAndSalesId } from "../../../../Helper/filterCustomerAndSalesId";
import { createSalesReturn, generateSalesReturnNumber } from "../../../../Redux/salesReturn/salesReturnSlice";
import { getAllCustomers } from "../../../../Redux/customer/customerSlice";
import {
  findCustomerByName,
  processSaleOrderItems,
} from "../../../../Helper/filterCustomerByName";
import { toast, ToastContainer } from "react-toastify";
import { getInvoiceDetails } from "../../../../Redux/salesInvoiceSlice/salesInvoice";

const NewSalesReturn = ({ backToList, openNewSalesReturn }) => {
  const [openNewSalesReturnDetails, setOpenNewSalesReturnDetails] =
    useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { customers } = useSelector((state) => state.customers);
  const { loading, salesReturnData, error } = useSelector(
    (state) => state.salesReturn
  );
  const {salesInvoiceData} = useSelector((state) => state.salesInvoice)
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectSaleOrderId, setSelectSaleOrderId] = useState([]);
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyName, setCompanyName] = useState({});
  const dispatch = useDispatch();
  const [returnData, setReturnData] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newSalesReturnSchema) });
  const [formData, setFormData] = useState({
    customerName: selectedCustomer,
    salesOrderId: selectedSalesOrder,
    companyName: companyName?.basicInformation?.companyName,
    salesReturnId: salesReturnData?.salesReturnId || "",
    salesReturnDate: "",
    invoiceNumber: "",
    invoiceDate: "",
    warehouse: "",
    itemDetails: [],
  });

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedItemDetails = [...formData.itemDetails];
    updatedItemDetails[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemDetails: updatedItemDetails,
    }));
  };

  const onSubmit = (data) => {}

  const handleSalesReturn = () => {
    dispatch(createSalesReturn(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {setReturnData(response.data); setOpenNewSalesReturnDetails(true)}, 2000);
      })
      .catch((error) => toast.error(error));
  };

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
      const selectedCustomer = findCustomerByName(
        customers && customers,
        selectedOption.value
      );
      setCompanyName(selectedCustomer);
    } else {
      setSelectSaleOrderId([]);
    }
    setSelectedSalesOrder(null);
  };

  // Handle sales order selection change
  const handleSalesOrderChange = (selectedOption) => {
    dispatch(getInvoiceDetails(selectedOption.value));
    setSelectedSalesOrder(selectedOption);
    if (selectedOption?.value) {
      dispatch(getSaleOrderBySaleOrderId(selectedOption.value));
    }
  };

  useEffect(() => {
    dispatch(getAllSalesOrder());
    dispatch(generateSalesReturnNumber());
    dispatch(getAllCustomers());
  }, [dispatch]);

  // Process customer options for dropdown
  useEffect(() => {
    if (allSaleOrder) {
      const filteredData = filterCustomerAndSalesId(allSaleOrder);

      const customerOptions = Array.from(
        new Set(
          filteredData
            ?.filter((customer) => customer.customerName)
            .map((customer) => customer.customerName)
        )
      ).map((name) => ({
        label: name,
        value: name,
      }));

      const defaultOption = { label: "Select", value: "", isDisabled: true };

      setCategoryOptions([defaultOption, ...customerOptions]);
    }
  }, [allSaleOrder]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (saleOrderData && saleOrderData.salesOrderId) {
        const details = await processSaleOrderItems(saleOrderData, dispatch);

        if (details) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            itemDetails: details,
          }));
        }
      }
    };

    fetchItemDetails();
  }, [saleOrderData, dispatch]);

  useEffect(() => {
    if (companyName?.basicInformation?.companyName) {
      setFormData((prevState) => ({
        ...prevState,
        companyName: companyName.basicInformation.companyName,
      }));
    }
  }, [companyName]);

  useEffect(() => {
    if(salesInvoiceData) {
      setFormData((prevState) => ({
        ...prevState,
        invoiceNumber: salesInvoiceData?.invoiceId,
        invoiceDate: salesInvoiceData?.invoiceDate
      }))
    }
  },[salesInvoiceData])

  // Update formData when salesReturnData changes
  useEffect(() => {
    if (salesReturnData?.salesReturnId) {
      setFormData((prevState) => ({
        ...prevState,
        salesReturnId: salesReturnData.salesReturnId,
      }));
    }
  }, [salesReturnData]);

  return (
    <div>
      {openNewSalesReturnDetails ? (
        <NewSalesReturnDetails
          backToList={() => setOpenNewSalesReturnDetails(false)}
          isChecked={isChecked}
          returnData={returnData}
          openNewSalesReturn={openNewSalesReturn}
        />
      ) : (
        <div className="purchase-list">
          <h2>New sales return</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="new-package-form">
            <p>Company name - {formData.companyName}</p>
            <hr />
            <div className="new-package-name-sales mb-4 mt-5">
              <Form.Group className="col-md-4 customer-name-dropdown">
                <div className="d-flex align-items-center gap-2">
                  <Form.Label className="custom-label mb-0">
                    Customer name
                  </Form.Label>
                  {errors.customerName && (
                    <ErrorOutlineOutlinedIcon className="text-danger" />
                  )}
                </div>
                <div className="form-group inventory-custom-dropdown mt-2">
                  <Select
                    options={categoryOptions}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    onChange={(selected) => {
                      setValue("customerName", selected.value);
                      trigger("customerName");
                      handleCustomerChange(selected);
                    }}
                    value={selectedCustomer}
                  />
                </div>
              </Form.Group>
              <Form.Group className="col-md-4 customer-name-dropdown me-md-5 form-right-field">
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Sales order
                  </Form.Label>
                  {errors.salesOrder && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <div className="form-group inventory-custom-dropdown mt-2">
                  <Select
                    options={selectSaleOrderId}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    value={selectedSalesOrder}
                    onChange={(selected) => {
                      setValue("salesOrder", selected.value);
                      trigger("salesOrder");
                      handleSalesOrderChange(selected);
                    }}
                  />
                </div>
              </Form.Group>
            </div>
            <hr />
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">#RA</Form.Label>
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      value={formData.salesReturnId}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-3 form-right-field">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Sale return Date
                    </Form.Label>
                    {errors.date && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      type="date"
                      {...register("date")}
                      value={formData.salesReturnDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salesReturnDate: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Invoice number
                    </Form.Label>
                    {errors.invoiceNumber && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      {...register("invoiceNumber")}
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          invoiceNumber: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-3 form-right-field">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Invoice Date
                    </Form.Label>
                    {errors.invoiceDate && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      type="date"
                      {...register("invoiceDate")}
                      value={formData.invoiceDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          invoiceDate: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-4">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Warehouse
                    </Form.Label>
                    {errors.warehouse && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Select
                      className="custom-textfield"
                      {...register("warehouse")}
                      value={formData.warehouse}
                      onChange={(e) =>
                        setFormData({ ...formData, warehouse: e.target.value })
                      }
                    >
                      <option value="">Select Warehouse</option>
                      <option value="warehouse1">Warehouse 1</option>
                      <option value="warehouse2">Warehouse 2</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-sales-return-checkbox d-flex mb-5">
              <input
                className="me-2"
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
              />
              <p>This return is for credit only items</p>
            </div>
            <div className="table-container mt-5 ms-0 me-5">
              <Table
                bordered
                className="custom-table sales-in-outbound-table new-sales-return-table"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item name</th>
                    <th>Reason</th>
                    <th>Shipped</th>
                    <th>Returned</th>
                    <th>{isChecked ? "Receivable Qty" : "Return Qty"}</th>
                    {isChecked && <th>Credit Qty</th>}
                  </tr>
                </thead>
                <tbody>
                  {formData.itemDetails && formData.itemDetails.length > 0 ? (
                    formData.itemDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.itemName}
                          <br />
                          {item.sku}
                        </td>
                        <td>
                          <input
                            type="text"
                            style={{ width: "80%" }}
                            value={item.reason}
                            onChange={(e) =>
                              handleInputChange(e, index, "reason")
                            }
                          />
                        </td>
                        <td>{item.shipped || 0}</td>
                        <td>
                          <input
                            type="text"
                            style={{ width: "50%" }}
                            value={item.returned}
                            onChange={(e) =>
                              handleInputChange(e, index, "returned")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            style={{ width: "50%" }}
                            value={
                              isChecked ? item.receivableQty : item.returnQty
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                isChecked ? "receivableQty" : "returnQty"
                              )
                            }
                          />
                        </td>
                        {isChecked && (
                          <td>
                            <input
                              type="text"
                              style={{ width: "50%" }}
                              value={item.creditQty}
                              onChange={(e) =>
                                handleInputChange(e, index, "creditQty")
                              }
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>No items to display</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    className="btn flex-grow-1"
                    style={{ color: "white", backgroundColor: "#1F3F7F" }}
                    onClick={handleSalesReturn}
                  >
                    Create
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
      )}
      <ToastContainer />
    </div>
  );
};

export default NewSalesReturn;
