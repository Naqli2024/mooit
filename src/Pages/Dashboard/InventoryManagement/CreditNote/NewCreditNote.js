import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import NewCreditNoteDetails from "./NewCreditNoteDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newCreditNoteSchema } from "../../../../Helper/validation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from "react-bootstrap/Table";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  createCreditNote,
  generateCreditNoteId,
} from "../../../../Redux/creditNote/creditNoteSlice";
import Loader from "../../../../Helper/Loader";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { filterCustomerAndSalesId } from "../../../../Helper/filterCustomerAndSalesId";
import { toast, ToastContainer } from "react-toastify";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { getAllCustomers } from "../../../../Redux/customer/customerSlice";
import { getSalesReturnBySalesOrderId } from "../../../../Redux/salesReturn/salesReturnSlice";
import { getInvoiceDetails } from "../../../../Redux/salesInvoiceSlice/salesInvoice";
import { findCustomerByName } from "../../../../Helper/filterCustomerByName";

const NewCreditNote = ({ backToList, setShowCreditDetails }) => {
  const [openNewCreditNoteDetails, setOpenNewCreditNoteDetails] =
    useState(false);
  const [isShippingLocked, setIsShippingLocked] = useState(true);
  const [isVATLocked, setIsVATLocked] = useState(true);
  const [newCreditNote, setNewCreditNote] = useState(false);
  const { loading, creditNote } = useSelector((state) => state.creditNote);
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const { salesInvoiceData } = useSelector((state) => state.salesInvoice);
  const { salesReturnData } = useSelector((state) => state.salesReturn);
  const { customers } = useSelector((state) => state.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectSaleOrderId, setSelectSaleOrderId] = useState([]);
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyName, setCompanyName] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newCreditNoteSchema) });
  const dispatch = useDispatch();

  const onSubmit = (data) => {};

  const [formData, setFormData] = useState({
    customerName: selectedCustomer,
    salesOrderId: selectedSalesOrder,
    companyName: companyName?.basicInformation?.companyName,
    creditNoteId: "",
    creditNoteDate: "",
    salesPerson: "",
    itemDetails: [],
    notes: "",
    subTotal: 0,
    shippingCharges: 0,
    VAT: 0,
    totalAmount: 0,
    priceAdjustment: 0,
    refundAmount: 0,
    notes: "",
    status: "Draft",
  });

  const handleCreditNote = () => {
    dispatch(createCreditNote(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          setNewCreditNote(response.data);
          setOpenNewCreditNoteDetails(true);
        }, 2000);
      })
      .catch((error) => toast.error(error));
  };

  //Remove index
  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      itemDetails: prev.itemDetails.filter((_, i) => i != index),
    }));
  };

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
    setSelectedSalesOrder(selectedOption);
  };

  useEffect(() => {
    if (salesInvoiceData) {
      setFormData((prev) => ({
        ...prev,
        itemDetails:
          salesInvoiceData?.itemDetails?.map((item) => {
            // Find the corresponding item in salesReturnData
            const matchedReturnItem =
              salesReturnData?.itemDetails?.find(
                (returnItem) => returnItem.itemName === item.itemName
              ) || {};

            return {
              ...item,
              reason: matchedReturnItem?.reason || "No Reason",
            };
          }) || [],
        shippingCharges: salesInvoiceData?.shippingCharges,
        VAT: salesInvoiceData?.VAT,
        totalAmount: salesInvoiceData?.totalAmount,
        invoiceId: salesInvoiceData?.invoiceId
      }));
    }
  }, [salesInvoiceData, salesReturnData, setFormData]);

  useEffect(() => {
    if (!salesInvoiceData || !selectedSalesOrder) {
      setFormData({ itemDetails: [] });
    }
  }, [salesInvoiceData]);

  useEffect(() => {
    if (creditNote) {
      setFormData((prev) => ({
        ...prev,
        creditNoteId: creditNote,
      }));
    }
  }, [creditNote]);

  useEffect(() => {
    if (selectedSalesOrder) {
      dispatch(getInvoiceDetails(selectedSalesOrder.value));
      dispatch(getSalesReturnBySalesOrderId(selectedSalesOrder.value));
    }
  }, [selectedSalesOrder]);

  // Fetch Invoice ID and Order No on component mount
  useEffect(() => {
    dispatch(getAllSalesOrder());
    dispatch(getAllCustomers());
    dispatch(generateCreditNoteId());
  }, [dispatch]);

  // Update formData when customer or salesOrder changes
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      customerName: selectedCustomer?.value || null,
      salesOrderId: selectedSalesOrder?.value || null,
    }));
  }, [selectedCustomer, selectedSalesOrder]);

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
    if (companyName?.basicInformation?.companyName) {
      setFormData((prevState) => ({
        ...prevState,
        companyName: companyName.basicInformation.companyName,
      }));
    }
  }, [companyName]);

  useEffect(() => {
    const newSubTotal = formData.itemDetails?.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );

    setFormData((prev) => ({ ...prev, subTotal: newSubTotal }));
  }, [formData.itemDetails]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      refundAmount:
        Number(prevFormData.subTotal || 0) +
        Number(prevFormData.priceAdjustment || 0),
    }));
  }, [formData.subTotal, formData.priceAdjustment]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalAmount:
        Number(salesInvoiceData?.totalAmount || 0) -
        Number(prevFormData.refundAmount || 0),
    }));
  }, [formData.refundAmount]);

  return (
    <div>
      {loading && <Loader />}
      {openNewCreditNoteDetails ? (
        <NewCreditNoteDetails
          backToList={() => setOpenNewCreditNoteDetails(false)}
          creditNote={newCreditNote}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Credit note</h2>
          <button onClick={() => {backToList(); setShowCreditDetails(false)}} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="new-package-form">
            <p>Company name - {formData.companyName}</p>
            <hr />
            <div className="new-package-name-sales mb-4 mt-5">
              <Form.Group className="col-md-5 customer-name-dropdown">
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
                    value={selectedCustomer}
                    onChange={(selected) => {
                      setValue("customerName", selected.value);
                      trigger("customerName");
                      handleCustomerChange(selected);
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="col-md-5 customer-name-dropdown me-md-5">
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
            <div className="sales-address mt-4 mb-4">
              <div className="billing-address col-md-6 me-4">
                <div className="edit-icon">
                  Billing address
                  <span>
                    <EditOutlinedIcon />
                  </span>
                </div>
                <div>xxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxx</div>
              </div>
              <div className="shipping-address col-md-">
                <div className="edit-icon">
                  Shipping address
                  <span>
                    <EditOutlinedIcon />
                  </span>
                </div>
                <div>xxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxx</div>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Credit note id
                    </Form.Label>
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      value={formData.creditNoteId}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-3 form-right-field">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Credit note date
                    </Form.Label>
                    {errors.creditNoteDate && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      {...register("creditNoteDate")}
                      type="date"
                      value={formData.creditNoteDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          creditNoteDate: e.target.value,
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
                      Sales person
                    </Form.Label>
                    {errors.salesPerson && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Select
                      aria-label="Select Status"
                      className="custom-textfield"
                      {...register("salesPerson")}
                      value={formData.salesPerson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salesPerson: e.target.value,
                        })
                      }
                    >
                      <option value="">Sales person</option>
                      <option value="person1">Person 1</option>
                      <option value="person2">Person 2</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="table-container delivery-tableWrapper mt-5 ms-0">
              <Table
                bordered
                className="custom-table sales-in-outbound-table delivery-tableHeader"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item name</th>
                    <th>Reason</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>GST</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.itemDetails && formData.itemDetails.length > 0 ? (
                    formData.itemDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.itemName || item.name}
                          <br />
                          {item.sku || "N/A"}
                          <span
                            onClick={() => handleRemoveItem(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <ClearIcon className="table-item-cancel" />
                          </span>
                        </td>
                        <td>
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            value={item.reason || "No Reason"}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control fixed-input"
                            value={item.quantity}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control fixed-input"
                            value={item.price}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control fixed-input"
                            value={item.discount}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control fixed-input"
                            value={item.gst}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control fixed-input"
                            value={item.total}
                          />
                        </td>
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
            <div className="credit-note-notes">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <Form.Label className="custom-label mb-0">Notes</Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="description-textfield"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="credit-note-bottom-content me-3">
                <div className="open-inventory">
                  <p className="col-md-8">Subtotal</p>
                  <p className="col-md-3 d-flex justify-content-center fw-normal">
                    {formData.subTotal}
                  </p>
                </div>
                <div className="open-inventory">
                  <p onClick={() => setIsShippingLocked(!isShippingLocked)}>
                    {isShippingLocked ? (
                      <LockOutlinedIcon />
                    ) : (
                      <LockOpenOutlinedIcon />
                    )}
                  </p>
                  <p className="col-8">Shipping charges</p>
                  <p className="col-3 fw-normal">
                    <input
                      type="text"
                      className="form-control text-center"
                      readOnly={isShippingLocked}
                      value={formData?.shippingCharges}
                    />
                  </p>
                </div>
                <div className="open-inventory">
                  <p onClick={() => setIsVATLocked(!isVATLocked)}>
                    {isVATLocked ? (
                      <LockOutlinedIcon />
                    ) : (
                      <LockOpenOutlinedIcon />
                    )}
                  </p>
                  <p className="col-8">VAT%</p>
                  <p className="col-3 fw-normal">
                    <input
                      type="text"
                      className="form-control text-center"
                      readOnly={isVATLocked}
                      value={formData?.VAT}
                    />
                  </p>
                </div>
                <div className="open-inventory">
                  <p className="col-8 fw-normal">Price adjustment</p>
                  <p className="col-3 fw-normal">
                    <input
                      type="number"
                      className="form-control text-center"
                      value={formData.priceAdjustment}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          priceAdjustment: e.target.value,
                        }))
                      }
                    />
                  </p>
                </div>
                <div className="open-inventory fw-bold">
                  <p className="col-md-8">Refund amount</p>

                  <input
                    type="text"
                    className="form-control"
                    value={formData.refundAmount || 0}
                    readOnly
                  />
                </div>
                <div className="open-inventory fw-bold">
                  <p className="col-md-8">Total amount</p>
                  <p className="col-md-3 d-flex justify-content-center">
                    {formData.totalAmount}
                  </p>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    className="btn flex-grow-1"
                    style={{ color: "white", backgroundColor: "#1F3F7F" }}
                    onClick={handleCreditNote}
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
      )}
      <ToastContainer />
    </div>
  );
};

export default NewCreditNote;
