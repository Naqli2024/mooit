import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SalesInvoiceReceipt from "./SalesInvoiceReceipt";
import Table from "react-bootstrap/Table";
import { InputGroup, Form } from "react-bootstrap";

const SalesReInvoiceDetails = ({ backToList }) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const openIcon = Boolean(openMoreIcon);
  const [paymentStatus, setPaymentStatus] = useState("paid"); 

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleClick = (event) => {
    setOpenMoreIcon(event.currentTarget);
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
        <div className="action-btn print-btn">
          <PrintOutlinedIcon className="action-icon" />
          Print
        </div>
        <div className="divider"></div>
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
                <option value="paid">Paid</option>
                <option value="halfPaid">Half Paid</option>
                <option value="pending">Pending</option>
              </Form.Select>
        <div className="divider"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={openIcon}
            onClose={() => setOpenMoreIcon(null)}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={() => setOpenMoreIcon(null)}>Delete</MenuItem>
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
        <div className="divider"></div>
      </div>
      <div>
        <Accordion
          sx={{
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Original Invoice
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <SalesInvoiceReceipt />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>Credit note</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <SalesInvoiceReceipt />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="sales-invoice-outer-card mt-5">
      <p className={paymentStatus == "paid" ? "paid-label" : paymentStatus == "halfPaid" ?"half-paid-label" : "pending-label"}>{paymentStatus === "halfPaid" ? "Half Paid" : paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</p>
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <p>LOGO</p>
              <p className="sales-id-text">xxxxxxxxxxxxx</p>
              <p className="sales-id-text">xxxxxxxxxxxxx</p>
            </div>
            <div className="sales-order-date me-5">
              <p className="detail-heading mb-2 fw-bold">RE-Invoice</p>
              <p className="sales-id-text">RIN#366463</p>
            </div>
          </div>
          <div className="sales-invoice mt-4">
            <div className="mt-5">
              <p className="fw-bold">Bill to</p>
              <p>xxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxx</p>
            </div>
            <div className="sales-order-date mt-5 me-5">
              <div className="d-flex mb-3">
                <p className="col-5">SO#</p>
                <p className="col-2">:</p>
                <p className="col-6">34634465</p>
              </div>
              <div className="d-flex mb-3">
                <p className="col-5">Invoice date</p>
                <p className="col-2">:</p>
                <p className="col-6">23-04-2024</p>
              </div>
              <div className="d-flex">
                <p className="col-5">Due date</p>
                <p className="col-2">:</p>
                <p className="col-6">23-04-2024</p>
              </div>
            </div>
          </div>
          <div className="row invoice-table mt-5">
            <Table className="table-content sales-invoice-table delivery-tableHeader">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="item-name-text">Item name</th>
                  <th>Qty</th>
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
                  <td>27</td>
                  <td>56,965</td>
                  <td>5,000</td>
                  <td>5%</td>
                  <td>57,965</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="credit-note-bottom-content">
            <div className="open-inventory mb-3">
              <p className="col-md-8">Subtotal</p>
              <p className="col-md-3 d-flex justify-content-center">850</p>
            </div>
            <div className="open-inventory mb-3">
              <p className="col-md-8">Shipping charges</p>
              <p className="col-md-3 d-flex justify-content-center">500</p>
            </div>
            <div className="open-inventory mb-3">
              <p className="col-md-8">VAT%</p>
              <p className="col-md-3 d-flex justify-content-center">15</p>
            </div>
            <div className="open-inventory fw-bold">
              <p className="col-md-8">Total amount</p>
              <p className="col-md-3 d-flex justify-content-center">20,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReInvoiceDetails;
