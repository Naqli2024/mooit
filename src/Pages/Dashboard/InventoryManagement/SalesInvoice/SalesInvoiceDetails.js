import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { InputGroup, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { refundDialogSchema } from "../../../../Helper/validation";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteSalesInvoiceByInvoiceId,
  editSalesInvoice,
} from "../../../../Redux/salesInvoiceSlice/salesInvoice";
import { useReactToPrint } from "react-to-print";

const SalesInvoiceDetails = ({ backToList, salesInvoice }) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const [paymentStatus, setPaymentStatus] = useState("1");
  const [openDialog, setOpenDialog] = useState(false);
  const openIcon = Boolean(openMoreIcon);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Package Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleClick = (event) => {
    setOpenMoreIcon(event.currentTarget);
  };

  const handleOpenNewCredit = () => {
    navigate("/admin/credit-note");
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    let statusUpdate = {};

    if (selectedValue === "2") {
      statusUpdate = {
        invoiceId: salesInvoice?.invoiceId,
        status: "Approved",
        paymentStatus: "Approved",
      };
    } else if (selectedValue === "3") {
      statusUpdate = { invoiceId: salesInvoice?.invoiceId, status: "Rejected" };
    } else {
      statusUpdate = { invoiceId: salesInvoice?.invoiceId, status: "Draft" };
    }

    dispatch(editSalesInvoice(statusUpdate));
  };

  const handlePaymentStatusChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "HalfPaid") {
      setOpenDialog(true);
    } else {
      setPaymentStatus(selectedValue);
      dispatch(
        editSalesInvoice({
          invoiceId: salesInvoice?.invoiceId,
          paymentStatus: selectedValue,
        })
      );
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "Draft":
        return "Draft";
      case "Approved":
        return "Approved";
      case "Rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "Approved":
        return "Approved";
      case "Paid":
        return "Paid";
      case "HalfPaid":
        return "Half Paid";
      case "Pending":
        return "Pending";
      default:
        return status;
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(refundDialogSchema) });

  const handleDialogSubmit = async () => {
    const amount = watch("amount"); // Get amount from the form
    const paymentMode = watch("paymentMode"); // Get selected payment mode
    if (!amount || !paymentMode) {
      alert("Please enter the amount and select a payment mode.");
      return;
    }

    // Dispatch action to update invoice
    dispatch(
      editSalesInvoice({
        invoiceId: salesInvoice?.invoiceId,
        paymentAmount: amount,
        paymentMode: paymentMode,
        paymentStatus: "HalfPaid",
      })
    );
    //close modal
    setOpenDialog(false);
  };

  const handleInvoiceDelete = () => {
    dispatch(deleteSalesInvoiceByInvoiceId(salesInvoice?.invoiceId))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setOpenMoreIcon(null);
        backToList();
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  };

  return (
    <div className="purchase-list">
      <h2>Sales Invoice</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="edit-print-del-btn mb-3">
        <div className="action-btn edit-btn">
          <EditOutlinedIcon className="action-icon" />
          Edit
        </div>
        <div className="divider"></div>
        <div className="action-btn print-btn" onClick={reactToPrintFn}>
          <PrintOutlinedIcon className="action-icon" />
          Print
        </div>
        <div className="divider"></div>
        {salesInvoice?.paymentStatus != "Paid" && (
          <>
            {salesInvoice?.status === "Approved" ? (
              <Form.Select
                aria-label="Default select example"
                className="salesOrder-dropdown-style"
                value={paymentStatus}
                onChange={handlePaymentStatusChange}
                style={{ width: "120px" }}
              >
                <option value="1" disabled>
                  Status
                </option>
                <option value="Paid">Paid</option>
                <option value="HalfPaid">Half Paid</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            ) : (
              <Form.Select
                aria-label="Default select example"
                className="salesOrder-dropdown-style"
                value={
                  salesInvoice?.status === "Draft" ? "1" : salesInvoice?.status
                }
                onChange={handleStatusChange}
              >
                <option value="1" disabled>
                  Status
                </option>
                <option value="2">Approve</option>
                <option value="3">Reject</option>
              </Form.Select>
            )}
            <div className="divider"></div>
          </>
        )}
        {salesInvoice?.paymentStatus == "Paid" && (
          <>
            <>
              <div
                className="ms-2 me-2 cursor-pointer"
                onClick={handleOpenNewCredit}
              >
                Create Credit note
              </div>
              <div className="divider"></div>
            </>
          </>
        )}
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={openIcon}
            onClose={() => setOpenMoreIcon(null)}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleInvoiceDelete}>Delete</MenuItem>
          </Menu>
          <Breadcrumbs aria-label="breadcrumbs">
            <IconButton
              className="more-icon-btn"
              size="large"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
          </Breadcrumbs>
        </React.Fragment>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "450px",
              maxWidth: "80vw",
            },
          }}
        >
          <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
            <h2>Partial Payment</h2>
          </DialogTitle>
          <DialogContent>
            <div className="mt-4 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Enter Amount
                    </Form.Label>
                    {errors.amount && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-1">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      {...register("amount", { required: true })}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="mt-4 col-md-8">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Payment mode
                  </Form.Label>
                  {errors.paymentMode && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <InputGroup className="mt-1">
                  <Form.Select
                    aria-label="Select"
                    className="custom-textfield"
                    name="paymentMode"
                    {...register("paymentMode", { required: true })}
                  >
                    <option value="">Payment mode</option>
                    <option value="cash">Cash</option>
                    <option value="bankTransfer">Bank transfer</option>
                    <option value="cheque">Cheque</option>
                    <option value="creditCard">Credit card</option>
                    <option value="debitCard">Debit card</option>
                    <option value="payPal">Paypal</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: "8px",
              padding: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDialogSubmit}
              sx={{
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                backgroundColor: "#1F3F7F",
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                backgroundColor: "#CFCFCF",
                color: "black",
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div className="divider"></div>
      </div>
      <div className="sales-invoice-outer-card mt-5" ref={componentRef}>
        <p
          className={
            salesInvoice?.paymentStatus === "Paid"
              ? "paid-label"
              : salesInvoice?.paymentStatus === "HalfPaid"
              ? "half-paid-label"
              : salesInvoice?.paymentStatus === "Pending"
              ? "pending-label"
              : salesInvoice?.status === "Approved"
              ? "challan-approve"
              : "package-label"
          }
        >
          {salesInvoice?.status === "Approved" && salesInvoice?.paymentStatus
            ? getPaymentStatus(salesInvoice?.paymentStatus)
            : getStatus(salesInvoice?.status)}
        </p>
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <p>LOGO</p>
              <p className="sales-id-text">xxxxxxxxxxxxx</p>
              <p className="sales-id-text">xxxxxxxxxxxxx</p>
            </div>
            <div className="sales-order-date me-5">
              <p className="detail-heading mb-1">Invoice</p>
              <p className="sales-id-text">{salesInvoice?.invoiceId}</p>
            </div>
          </div>
          <div className="sales-invoice mt-5">
            <div className="mb-5">
              <p className="fw-bold">Bill to</p>
              <p>xxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxx</p>
            </div>
            <div className="sales-order-date me-5">
              <div className="d-flex mb-3 me-5">
                <p className="col-8">SO#</p>
                <p className="col-2">:</p>
                <p className="col-2">{salesInvoice?.salesOrderId}</p>
              </div>
              <div className="d-flex mb-3 me-5">
                <p className="col-8">Invoice date</p>
                <p className="col-2">:</p>
                <p className="col-2">{salesInvoice?.invoiceDate}</p>
              </div>
              <div className="d-flex mb-3 me-5">
                <p className="col-8">Due date</p>
                <p className="col-2">:</p>
                <p className="col-2">{salesInvoice?.dueDate}</p>
              </div>
            </div>
          </div>
          <div className="table-container delivery-tableWrapper mt-3 ms-0 me-0">
            <Table className="custom-table sales-in-outbound-table delivery-tableHeader">
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
                {salesInvoice?.itemDetails &&
                salesInvoice?.itemDetails.length > 0 ? (
                  salesInvoice.itemDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="item-name-text">
                        {item.itemName || item.name}
                      </td>
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
            </Table>
          </div>
        </div>
        <div className="credit-note-bottom-content me-5">
          <div className="open-inventory mb-3">
            <p className="col-md-8">Subtotal</p>
            <p className="col-md-3 d-flex justify-content-center">
              {salesInvoice?.subTotal}
            </p>
          </div>
          <div className="open-inventory mb-3">
            <p className="col-md-8">Shipping charges</p>
            <p className="col-md-3 d-flex justify-content-center">
              {salesInvoice?.shippingCharges}
            </p>
          </div>
          <div className="open-inventory mb-3">
            <p className="col-md-8">VAT%</p>
            <p className="col-md-3 d-flex justify-content-center">
              {salesInvoice?.VAT}
            </p>
          </div>
          {paymentStatus === "HalfPaid" && (
            <div className="open-inventory mb-3">
              <p className="col-md-8">Partial amount</p>
              <p className="col-md-3 d-flex justify-content-center text-danger">
                -1000
              </p>
            </div>
          )}
          <div className="open-inventory fw-bold">
            <p className="col-md-8">Total amount</p>
            <p className="col-md-3 d-flex justify-content-center">
              {salesInvoice?.totalAmount}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SalesInvoiceDetails;
