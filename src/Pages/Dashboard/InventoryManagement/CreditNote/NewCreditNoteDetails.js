import React, { useState } from "react";
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

const NewCreditNoteDetails = ({ backToList }) => {
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
    setOpenDialog(false);
    setIsFutureCredit(false);
    setOpenLinkInvoiceDetails(true);
  };

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
    handleRefundCloseMenu();
    setIsFutureCredit(true);
    setOpenLinkInvoiceDetails(true);
  };

  const handleLinkToInvoice = () => {
    handleRefundCloseMenu();
    setOpenLinkInvoice(true);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "2") {
      setStatus("Approved");
    } else if (selectedValue === "3") {
      setStatus("Rejected");
    } else {
      setStatus("Draft");
    }
  };

  const handleOpenCreateInvoice = () => {
    setOpenSalesReInvoice(true);
  }

  return (
    <div>
      {openLinkInvoice ? (
        <LinkInvoice backToList={() => setOpenLinkInvoice(false)} />
      ) : openLinkInvoiceDetails ? (
        <LinkInvoiceDetails
          isFutureCredit={isFutureCredit}
          backToList={() => setOpenLinkInvoiceDetails(false)}
        />
      ) : openSalesReInvoice ? (<SalesReInvoice backToList={()=>setOpenSalesReInvoice(false)}/>)
       : (
        <div className="purchase-list">
          <h2>CN-00001</h2>
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
            <div className="action-btn print-btn">
              <PrintOutlinedIcon className="action-icon" />
              Print
            </div>
            <div className="divider"></div>
            {!isConfirmed && (
              <>
                {status === "Approved" ? (
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
                    <option value="2">Approve</option>
                    <option value="3">Reject</option>
                  </Form.Select>
                )}
                <div className="divider"></div>
              </>
            )}
            <div className="ms-2 me-2 cursor-pointer" onClick={handleOpenCreateInvoice}>Create invoice</div>
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
                <MenuItem onClick={() => setOpenMoreIcon(null)}>
                  Delete
                </MenuItem>
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
                <h2>Direct Refund (CN-0001)</h2>
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
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="ms-3 mt-4">Refund amount:12,000</div>
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
          <div className="sales-invoice-outer-card mt-5">
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
                  <p className="sales-id-text">#CN54675</p>
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
                    <p className="col-6">Date</p>
                    <p className="col-2">:</p>
                    <p className="col-5">23/04/2024</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-6">SO#</p>
                    <p className="col-2">:</p>
                    <p className="col-5">82545532</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-6">Invoice</p>
                    <p className="col-2">:</p>
                    <p className="col-5">#3654363</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-6">Invoice date</p>
                    <p className="col-2">:</p>
                    <p className="col-5">23/04/2024</p>
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
                    <tr>
                      <td>1</td>
                      <td className="item-name-text">xxxxxxx</td>
                      <td>xxxxxxxxx</td>
                      <td>40</td>
                      <td>400</td>
                      <td>17%</td>
                      <td>5%</td>
                      <td>5000</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="credit-note-notes mb-3">
              <div className="ms-4 mt-4">
                <p className="fw-bold">Notes</p>
                <p>xxxxxxxxxx</p>
              </div>
              <div className="credit-note-bottom-content">
                <div className="open-inventory ms-4">
                  <p className="fw-bold">Total amount</p>
                  <p className="fw-bold col-2">5000</p>
                </div>
                <div className="open-inventory ms-4">
                  <p className="fw-bold">Refund amount</p>
                  <p className="fw-bold col-2">500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCreditNoteDetails;
