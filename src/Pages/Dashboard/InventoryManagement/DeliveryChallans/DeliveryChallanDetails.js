import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs, Link } from "@mui/material";

const DeliveryChallanDetails = ({ backToList }) => {
  const [isDelivered, setIsDelivered] = useState(false);
  const [openMoreIcon, setMoreIcon] = React.useState(null);
  const [status, setStatus] = useState("Draft");
  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "2") {
      setStatus("Approve");
    } else {
      setStatus("Draft");
    }
  };
  const handleDelivered = () => {
    setStatus("Delivered");
    setIsDelivered(true);
  };
  const open = Boolean(openMoreIcon);
  const handleClick = (event) => {
    if (event) {
      setMoreIcon(event.currentTarget);
    }
  };
  const handleClose = () => {
    setMoreIcon(null);
  };
  return (
    <div className="purchase-list">
      <h2>Delivery Challans</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="edit-print-del-btn">
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
        {!isDelivered && (
          <>
            {status === "Approve" ? (
              <div className="sales-id-text ms-2 me-2" onClick={handleDelivered}>
                Delivered
              </div>
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
              </Form.Select>
            )}
            <div className="divider"></div>
          </>
        )}
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={open}
            onClose={handleClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleClose}>Convert to Invoice</MenuItem>
            <MenuItem onClick={handleClose}>Reopen</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
          <Breadcrumbs aria-label="breadcrumbs">
            <IconButton className="more-icon-btn" size="large" onClick={handleClick}>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Breadcrumbs>
        </React.Fragment>
        <div className="divider"></div>
      </div>
      <div className="sales-invoice-outer-card mt-5">
        <div
          className={
            status === "Approve"
              ? "challan-approve"
              : status === "Delivered"
              ? "delivered-label"
              : "package-label"
          }
        >
          {status === "Approve"
            ? "Approved"
            : status === "Delivered"
            ? "Delivered"
            : "Draft"}
        </div>
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <div>LOGO</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="detail-heading mb-1">Delivery Challan</div>
              <div className="sales-id-text">Challan number: #CN-I706</div>
            </div>
          </div>
          <div className="sales-invoice mt-5">
            <div className="sales-order-bill">
              <div>Bill to:</div>
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date mt-5">
              <div className="mb-2 me-4">Order date: 23/04/2024</div>
            </div>
          </div>
          <div className="row invoice-table">
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
                  <td className="item-name-text">xxxxxxxxxx</td>
                  <td>27</td>
                  <td>56,965</td>
                  <td>5,000</td>
                  <td>5%</td>
                  <td>57,958</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="sales-invoice-bottom-content mb-3">
            <div className="sales-invoice-total col-4">
              <div className="">Sub total</div>
              <div className="col-2">500</div>
            </div>
            <div className="sales-invoice-total col-4">
              <div className="">Shipping charges</div>
              <div className="col-2">500</div>
            </div>
            <hr className="amount-divider" />
            <div className="sales-invoice-total col-4">
              <div className="fw-bold">Total amount</div>
              <div className="fw-bold col-2">1000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallanDetails;
