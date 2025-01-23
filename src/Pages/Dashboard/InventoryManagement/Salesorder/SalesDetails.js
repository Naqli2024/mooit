import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Form from "react-bootstrap/Form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Menu, MenuItem, IconButton, Breadcrumbs, Link } from "@mui/material";
import Table from "react-bootstrap/Table";

const SalesDetails = ({ backToList }) => {
  const [openMoreIcon, setMoreIcon] = React.useState(null);
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
    <div>
      <h2>Sales Order</h2>
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
        <Form.Select
          aria-label="Default select example"
          className="salesOrder-dropdown-style"
          defaultValue="1"
        >
          <option value="1" disabled>
            Status
          </option>
          <option value="2">Approve</option>
          <option value="2">Reject</option>
        </Form.Select>
        <div className="divider"></div>
        <Form.Select
          aria-label="Default select example"
          className="salesOrder-dropdown-style"
          defaultValue="1"
        >
          <option value="1" disabled>
            Create
          </option>
          <option value="2">Invoice</option>
          <option value="3">Package</option>
        </Form.Select>
        <div className="divider"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={open}
            onClose={handleClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleClose}>Closed</MenuItem>
            <MenuItem onClick={handleClose}>Void</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
          <Breadcrumbs aria-label="breadcrumbs">
            <IconButton size="small" onClick={handleClick}>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Breadcrumbs>
        </React.Fragment>
        <div className="divider"></div>
      </div>
      <FormControlLabel
        className="pdf-switch"
        control={<Switch defaultChecked />}
        labelPlacement="end"
        style={{ width: "98%" }}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "14px",
          },
        }}
        label="Pdf View"
      />
      <div className="create-invoice-outer-card">
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading">
              <div className="fw-bold">
                Sales Order<span className="draft-text">Draft</span>
              </div>
              <div className="sales-id-text">Sales order#9605</div>
            </div>
            <div className="sales-order-date">
              <div className="mb-2">Order date: 21/02/2024</div>
              <div className="mb-2">Shipment date: 21/03/2024</div>
              <div className="mb-2">Payment terms: Net 60</div>
              <div className="mb-2">Sales person: Jake paul</div>
            </div>
          </div>
          <div className="sales-invoice">
            <div className="sales-order-bill">
              <div>Bill to</div>
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-ship">
              <div className="mb-2">Ship to</div>
              <div>xxxxxxxxxxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxxxxxxxxxx</div>
            </div>
          </div>
          <div className="row invoice-table">
            <Table className="table-content sales-invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item name</th>
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
                  <td>xxxxxxxxxxxxxxx</td>
                  <td>27</td>
                  <td>56,965</td>
                  <td>5,000</td>
                  <td>5%</td>
                  <td>57,958</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="table-bottom-content">
            <div className="sales-invoice-total col-4">
              <div className="">Sub total</div>
              <div className="">500</div>
            </div>
            <div className="sales-invoice-total col-4">
              <div className="">Shipping charges</div>
              <div className="">500</div>
            </div>
            <hr className="amount-divider" />
            <div className="sales-invoice-total col-4">
              <div className="fw-bold">Total amount</div>
              <div className="fw-bold">1000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetails;
