import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import { InputGroup, Form } from "react-bootstrap";
import LinkInvoice from "./LinkInvoice";
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
import LinkInvoiceDetails from "./LinkInvoiceDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { refundDialogSchema } from "../../../../Helper/validation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SalesReInvoice from "./SalesReInvoice";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetails } from "../../../../Redux/salesInvoiceSlice/salesInvoice";
import {
  deleteCreditNoteByCreditNoteId,
  getCreditNoteDetailsByCreditNoteId,
  updateCreditNote,
} from "../../../../Redux/creditNote/creditNoteSlice";
import { toast, ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

const NewCreditNoteDetails = ({
  backToList,
  creditNote,
  setShowCreditDetails,
}) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const [openRefunds, setOpenRefunds] = React.useState(null);
  const openIcon = Boolean(openMoreIcon);
  const openRefund = Boolean(openRefunds);
  const [status, setStatus] = useState("Draft");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [openLinkInvoice, setOpenLinkInvoice] = useState(false);
  const [openLinkInvoiceDetails, setOpenLinkInvoiceDetails] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isFutureCredit, setIsFutureCredit] = useState(false);
  const [openSalesReInvoice, setOpenSalesReInvoice] = useState(false);
  const { salesInvoiceData } = useSelector((state) => state.salesInvoice);
  const dispatch = useDispatch();
  const componentRef = React.useRef(null);
  const [creditNoteData, setCreditNoteData] = useState();
  const [refundStatus, setRefundStatus] = useState({
    refundDate: "",
    paymentMode: "",
    amount: 0,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(refundDialogSchema) });

  const handleDialogSubmit = async () => {
    const isValid = await trigger(["refundDate", "paymentMode", "amount"]);
    if (!isValid) return;
    dispatch(
      updateCreditNote({
        creditNoteId: creditNote?.creditNoteId,
        payload: {
          refundStatus: "Direct refund",
          refund: refundStatus,
        },
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setCreditNoteData(response.data);
        setOpenDialog(false);
        backToList();
      })
      .catch((error) => toast.error(error));
  };

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

  const handleRefundClick = (event) => {
    setOpenRefunds(event.currentTarget);
  };

  const handleRefundCloseMenu = () => {
    setOpenRefunds(null);
  };

  const handleOpenDialog = () => {
    handleRefundCloseMenu();
    setOpenDialog(true);
  };

  const handleFutureCredit = () => {
    dispatch(
      updateCreditNote({
        creditNoteId: creditNote?.creditNoteId,
        payload: {
          creditAmount: creditNote?.refundAmount,
          refundStatus: "On-Hold",
          status: "On-Hold",
        },
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          handleRefundCloseMenu();
          backToList();
          setShowCreditDetails(false)
        }, 2000);
      })
      .catch((error) => toast.error(error));
  };

  const handleLinkToInvoice = () => {
    dispatch(
      updateCreditNote({
        creditNoteId: creditNote?.creditNoteId,
        payload: {
          creditAmount: creditNote?.refundAmount,
          refundStatus: "Link to invoice",
          status: "Closed",
        },
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setCreditNoteData(response.data);
        setTimeout(() => {
          handleRefundCloseMenu();
          setOpenLinkInvoice(true);
        }, 2000);
      })
      .catch((error) => toast.error(error))
  };

  const handleDelete = () => {
    dispatch(deleteCreditNoteByCreditNoteId(creditNote?.creditNoteId))
      .then((response) => {
        toast.success(response.payload.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        // Close the options menu
        setOpenMoreIcon(null);
        setTimeout(() => {
          backToList();
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong!");
        setOpenMoreIcon(null);
      });
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    const updatedStatus = selectedValue === "Approved" ? "Approved" : "Reject";

    dispatch(
      updateCreditNote({
        creditNoteId: creditNote?.creditNoteId,
        payload: { status: updatedStatus },
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });

        // Update local state immediately
        setStatus(updatedStatus);

        // Optionally refetch data after updating the store
        dispatch(getCreditNoteDetailsByCreditNoteId(creditNote?.creditNoteId));

        if (updatedStatus === "Reject") {
          setTimeout(() => backToList(), 1000);
        }
      })
      .catch((error) => toast.error(error));
  };

  const handleOpenCreateInvoice = () => {
    navigate('/admin/sales-invoice', {state: {openNewSalesInvoice: true, reInvoice: creditNote}})
  };

  const handleCreditNoteComplete = () => {
    dispatch(
      updateCreditNote({
        creditNoteId: creditNote?.creditNoteId,
        payload: {
          status: "Closed",
        },
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => setStatus("Closed"), 1000);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    if (creditNote) {
      dispatch(getInvoiceDetails(creditNote?.salesOrderId));
      setStatus(creditNote?.status);
    }
  }, [creditNote]);

  return (
    <div>
      {openLinkInvoice ? (
        <LinkInvoice backToList={() => setOpenLinkInvoice(false)} creditNoteData={creditNoteData}/>
      ) : openLinkInvoiceDetails ? (
        <LinkInvoiceDetails
          isFutureCredit={isFutureCredit}
          backToList={() => setOpenLinkInvoiceDetails(false)}
          creditNoteData={creditNoteData}
        />
      ) : openSalesReInvoice ? (
        <SalesReInvoice backToList={() => setOpenSalesReInvoice(false)} />
      ) : (
        <div className="purchase-list">
          <h2>{creditNote?.creditNoteId}</h2>
          <button
            onClick={() => {
              backToList();
              setShowCreditDetails(false);
            }}
            className="goBack-btn"
          >
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
            {creditNote?.refundStatus &&
              creditNote.status != "Closed" &&
              creditNote.status != "On-Hold" && (
                <>
                  <div
                    className="ms-2 me-2 cursor-pointer"
                    onClick={() => handleCreditNoteComplete()}
                  >
                    Mark as completed
                  </div>
                  <div className="divider"></div>
                </>
              )}
            {!creditNote?.refundStatus && (
              <>
                {creditNote?.status === "Approved" && status === "Approved" ? (
                  <React.Fragment>
                    <Menu
                      anchorEl={openRefunds}
                      open={openRefund}
                      onClose={() => setOpenRefunds(null)}
                      aria-labelledby="with-menu-demo-breadcrumbs"
                    >
                      <MenuItem onClick={handleOpenDialog}>
                        Direct refund
                      </MenuItem>
                      <hr className="mt-0 mb-0" />
                      <MenuItem onClick={handleFutureCredit}>
                        Future credit
                      </MenuItem>
                      <hr className="mt-0 mb-0" />
                      <MenuItem onClick={handleLinkToInvoice}>
                        Link to invoice
                      </MenuItem>
                    </Menu>
                    <Breadcrumbs aria-label="breadcrumbs">
                      <div
                        className="more-icon-btn ms-2 me-2 text-dark cursor-pointer"
                        onClick={handleRefundClick}
                      >
                        Refunds
                        <span className="ms-2">
                          <KeyboardArrowDownIcon />
                        </span>
                      </div>
                    </Breadcrumbs>
                  </React.Fragment>
                ) : (
                  <Form.Select
                    aria-label="Default select example"
                    className="salesOrder-dropdown-style"
                    defaultValue="1"
                    onChange={handleStatusChange}
                  >
                    <option value="1" disabled>
                      Status
                    </option>
                    <option value="Approved">Approve</option>
                    <option value="Reject">Reject</option>
                  </Form.Select>
                )}
                <div className="divider"></div>
              </>
            )}
            <div
              className="ms-2 me-2 cursor-pointer"
              onClick={handleOpenCreateInvoice}
            >
              Create invoice
            </div>
            <div className="divider"></div>
            <React.Fragment>
              <Menu
                anchorEl={openMoreIcon}
                open={openIcon}
                onClose={() => setOpenMoreIcon(null)}
                aria-labelledby="with-menu-demo-breadcrumbs"
              >
                <MenuItem onClick={() => setOpenMoreIcon(null)}>Void</MenuItem>
                <hr className="mt-0 mb-0" />
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
                  width: "600px",
                  maxWidth: "80vw",
                },
              }}
            >
              <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
                <h2>Direct Refund ({creditNote?.creditNoteId})</h2>
              </DialogTitle>
              <DialogContent>
                <div className="mt-3 col-md-7">
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-0">
                        Refunded on
                      </Form.Label>
                      {errors.refundDate && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-1">
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="packageReceipt"
                        type="date"
                        {...register("refundDate")}
                        value={refundStatus.refundDate}
                        onChange={(e) =>
                          setRefundStatus({
                            ...refundStatus,
                            refundDate: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="mt-4 col-md-7">
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
                        {...register("paymentMode")}
                        value={refundStatus.paymentMode}
                        onChange={(e) =>
                          setRefundStatus({
                            ...refundStatus,
                            paymentMode: e.target.value,
                          })
                        }
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
                <div className="mt-4 d-flex align-items-center">
                  <div className="col-md-7">
                    <Form.Group>
                      <div className="d-flex align-items-center">
                        <Form.Label className="custom-label mb-0">
                          Amount
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
                          {...register("amount")}
                          value={refundStatus.amount}
                          onChange={(e) =>
                            setRefundStatus({
                              ...refundStatus,
                              amount: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="ms-3 mt-4">
                    Refund amount: {creditNote?.refundAmount}
                  </div>
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
                status === "Approved" ? "challan-approve" : "package-label"
              }
            >{` ${status}`}</p>
            <div className="sales-invoice-detail">
              <div className="sales-invoice">
                <div className="sales-invoice-heading mt-2">
                  <p>LOGO</p>
                  <p className="sales-id-text">xxxxxxxxxxxxx</p>
                  <p className="sales-id-text">xxxxxxxxxxxxx</p>
                </div>
                <div className="sales-order-date me-5">
                  <p className="detail-heading mb-1">Credit notes</p>
                  <p className="sales-id-text">{creditNote?.creditNoteId}</p>
                </div>
              </div>
              <div className="sales-invoice mt-5">
                <div className="mb-5">
                  <p className="fw-bold">Bill to</p>
                  <p>xxxxxxxxxxxx</p>
                  <p>xxxxxxxxxxxx</p>
                </div>
                <div className="sales-order-date me-4">
                  <div className="d-flex mb-3">
                    <p className="col-5">Date</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{creditNote?.creditNoteDate}</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">SO#</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{creditNote?.salesOrderId}</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">Invoice</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{salesInvoiceData?.invoiceId}</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">Invoice date</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{salesInvoiceData?.invoiceDate}</p>
                  </div>
                </div>
              </div>
              <div className="table-container delivery-tableWrapper mt-3 ms-0 me-0">
                <Table className="custom-table sales-in-outbound-table delivery-tableHeader">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="item-name-text">Item name</th>
                      <th>Reason</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>GST</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditNote?.itemDetails &&
                    creditNote?.itemDetails.length > 0 ? (
                      creditNote?.itemDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="item-name-text">{item.itemName}</td>
                          <td>{item.reason}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>{item.gst}%</td>
                          <td>{item.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <td colSpan={8}>No items to display</td>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="credit-note-notes mb-3">
              <div className="ms-4 mt-4">
                <p className="fw-bold">Notes</p>
                <p>{creditNote?.notes}</p>
              </div>
              <div className="credit-note-bottom-content">
                <div className="open-inventory ms-4">
                  <p className="fw-bold">Total amount</p>
                  <p className="fw-bold col-2">{creditNote?.subTotal}</p>
                </div>
                <div className="open-inventory ms-4">
                  <p className="fw-bold">Refund amount</p>
                  <p className="fw-bold col-2">{creditNote?.refundAmount}</p>
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

export default NewCreditNoteDetails;
