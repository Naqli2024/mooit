import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { newSalesReInvoiceSchema } from "../../../../Helper/validation";
import SalesInvoiceDetails from "./SalesInvoiceDetails";
import { paymentTerms } from "../../../../Data/SalesOrderData";
import { useDispatch, useSelector } from "react-redux";
import {
  createSalesInvoice,
  generateInvoiceId,
  generateOrderNo,
  getAllInvoices,
} from "../../../../Redux/salesInvoiceSlice/salesInvoice";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { toast, ToastContainer } from "react-toastify";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { filterCustomerAndSalesId } from "../../../../Helper/filterCustomerAndSalesId";
import Loader from "../../../../Helper/Loader";
import { useLocation } from "react-router-dom";

const NewSalesInvoice = ({ backToList }) => {
  const [openSalesInvoiceDetails, setOpenSalesInvoiceDetails] = useState(false);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { customers } = useSelector((state) => state.customers);
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  // Get data from Redux store
  const { loading, salesInvoiceData } = useSelector(
    (state) => state.salesInvoice
  );
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectSaleOrderId, setSelectSaleOrderId] = useState([]);
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [salesInvoice, setSalesInvoice] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const creditNoteData = location.state?.reInvoice;
  console.log(creditNoteData);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newSalesReInvoiceSchema) });

  const onSubmit = (data) => {};

  const [formData, setFormData] = useState({
    customerName: selectedCustomer,
    salesOrderId: selectedSalesOrder,
    invoiceId: "",
    invoiceDate: "",
    paymentTerms: "",
    dueDate: "",
    orderNo: "",
    itemDetails: [],
    subTotal: 0,
    shippingCharges: 0,
    VAT: 0,
    totalAmount: 0,
    status: "Draft",
  });

  const handleSalesInvoice = () => {
    dispatch(createSalesInvoice(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          setSalesInvoice(response.data);
          setOpenSalesInvoiceDetails(true);
        }, 2000);
      })
      .catch((error) => toast.error(error));
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
    } else {
      setSelectSaleOrderId([]);
    }
    setSelectedSalesOrder(null);
  };

  // Handle sales order selection change
  const handleSalesOrderChange = (selectedOption) => {
    setSelectedSalesOrder(selectedOption);
    if (selectedOption?.value) {
      dispatch(getSaleOrderBySaleOrderId(selectedOption.value));
    }
  };

  // Fetch Invoice ID and Order No on component mount
  useEffect(() => {
    dispatch(getAllSalesOrder());
    if (!creditNoteData || Object.keys(creditNoteData).length ===0) {
      dispatch(generateInvoiceId());
      dispatch(generateOrderNo());
    }
  }, [dispatch, creditNoteData]);

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

  // Update formData when invoiceId or orderNo changes
  useEffect(() => {
    if (salesInvoiceData && !creditNoteData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        invoiceId: salesInvoiceData.invoiceId || prevFormData.invoiceId,
        orderNo: salesInvoiceData.orderNo || prevFormData.orderNo,
      }));
    }
  }, [salesInvoiceData]);

  // useEffect: Set item details and compute totalAmount based on VAT %
  useEffect(() => {
    if (saleOrderData) {
      setFormData((prevFormData) => {
        const vatAmount = (saleOrderData.total * prevFormData.VAT) / 100;
        return {
          ...prevFormData,
          itemDetails: saleOrderData?.itemDetails || [],
          subTotal: saleOrderData?.subTotal || 0,
          shippingCharges: saleOrderData?.shipmentCharges || 0,
          totalAmount:
            (saleOrderData.subTotal || 0) +
            (saleOrderData.shipmentCharges || 0) +
            vatAmount,
        };
      });
    }
  }, [saleOrderData]);

  // VAT input onChange: Recalculates totalAmount
  const handleVATChange = (e) => {
    const vatValue = parseFloat(e.target.value) || 0;
    setFormData((prev) => {
      const vatAmount = (prev.subTotal * vatValue) / 100;
      return {
        ...prev,
        VAT: vatValue,
        totalAmount: prev.subTotal + prev.shippingCharges + vatAmount,
      };
    });
  };

  return (
    <div>
      {loading && <Loader />}
      {openSalesInvoiceDetails ? (
        <SalesInvoiceDetails
          backToList={() => {
            setOpenSalesInvoiceDetails(false);
            dispatch(getAllInvoices);
          }}
          salesInvoice={salesInvoice}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Invoice</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="salesInvoice-form">
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
                    value={selectedCustomer}
                    onChange={(selected) => {
                      setValue("customerName", selected.value);
                      trigger("customerName");
                      handleCustomerChange(selected);
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="col-md-4 customer-name-dropdown">
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
            <div className="new-package-name-sales mb-4 mt-4">
              <div className="col-md-3 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Invoice id
                    </Form.Label>
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      value={formData.invoiceId}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-3 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Invoice date
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
              <div className="col-md-3 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Payment terms
                    </Form.Label>
                    {errors.paymentTerms && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Select
                      className="custom-textfield"
                      {...register("paymentTerms")}
                      value={formData.paymentTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentTerms: e.target.value,
                        })
                      }
                    >
                      {paymentTerms.map((terms) => (
                        <option>{terms}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4 mt-4">
              <div className="col-md-3 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Due date
                    </Form.Label>
                    {errors.dueDate && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      type="date"
                      {...register("dueDate")}
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-3 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Order no
                    </Form.Label>
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      value={formData.orderNo}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-3 mt-3"></div>
            </div>
            <div className="sales-table-outer-border mt-5">
              <div className="item-details">
                <h3>Item details</h3>
              </div>
              <table className="custom-table new-sales-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
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
                        <td>{item.itemName || item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.discount}</td>
                        <td>{item.gst}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>No items to display</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="credit-note-bottom-content me-3">
              <div className="open-inventory mb-3">
                <p className="col-md-8">Subtotal</p>
                <p className="col-md-3 d-flex justify-content-center fw-normal">
                  {formData.subTotal.toFixed(2)}
                </p>
              </div>
              <div className="open-inventory mb-3">
                <p className="col-md-8">Shipping charges</p>
                <p className="col-3 fw-normal">
                  <input
                    type="text"
                    className="form-control text-center"
                    value={formData.shippingCharges.toFixed(2)}
                    readOnly
                  />
                </p>
              </div>
              <div className="open-inventory mb-3">
                <p className="col-md-8">VAT%</p>
                <p className="col-3 fw-normal">
                  <input
                    type="text"
                    className="form-control text-center"
                    value={formData.VAT}
                    onChange={handleVATChange}
                  />
                </p>
              </div>
              <div className="open-inventory fw-bold">
                <p className="col-md-8">Total amount</p>
                <p className="col-md-3 d-flex justify-content-center">
                  {formData.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    className="btn flex-grow-1"
                    style={{ color: "white", backgroundColor: "#1F3F7F" }}
                    onClick={handleSalesInvoice}
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

export default NewSalesInvoice;
