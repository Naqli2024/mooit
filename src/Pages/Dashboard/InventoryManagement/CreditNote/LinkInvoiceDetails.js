import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import { InputGroup, Form } from "react-bootstrap";
import SalesReInvoice from "./SalesReInvoice";

const LinkInvoiceDetails = ({ isFutureCredit, backToList }) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const openIcon = Boolean(openMoreIcon);

  const handleClick = (event) => {
    setOpenMoreIcon(event.currentTarget);
  };

  const handleReOpen = () => {
    setOpenMoreIcon(null);
    setIsCompleted(true);
  };

  return (
    <div>
      {openCreateInvoice ? (<SalesReInvoice backToList={backToList}/>)
      : (<div className="purchase-list">
        <h2>CN-0001</h2>
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
          {isCompleted && !isFutureCredit && (
            <>
              <div
                className="ms-2 me-2 cursor-pointer"
                onClick={() => setIsCompleted(!isCompleted)}
              >
                Mark as completed
              </div>
              <div className="divider"></div>
            </>
          )}
          {!isFutureCredit && (
            <>
              <div className="ms-2 me-2 cursor-pointer" onClick={()=>(setOpenCreateInvoice(true))}>Create invoice</div>
              <div className="divider"></div>
            </>
          )}
          <React.Fragment>
            <Menu
              anchorEl={openMoreIcon}
              open={openIcon}
              onClose={() => setOpenMoreIcon(null)}
              aria-labelledby="with-menu-demo-breadcrumbs"
            >
              {!isFutureCredit && !isCompleted && (
                <>
                  <MenuItem onClick={handleReOpen}>Re-open</MenuItem>
                  <hr className="mt-0 mb-0" />
                </>
              )}
              <MenuItem onClick={() => setOpenMoreIcon(null)}>Void</MenuItem>
              <hr className="mt-0 mb-0" />
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
        <div className="sales-invoice-outer-card mt-5">
          <p
            className={
              isFutureCredit
                ? "hold-label"
                : !isCompleted
                ? "delivered-label"
                : "challan-approve"
            }
          >
            {isFutureCredit ? "On-Hold" : !isCompleted ? "Closed" : "Approved"}
          </p>
          <div className="sales-invoice-detail">
            <div className="sales-invoice">
              <div className="sales-invoice-heading mt-2">
                <p>LOGO</p>
                <p className="sales-id-text">xxxxxxxxxxxxx</p>
                <p className="sales-id-text">xxxxxxxxxxxxx</p>
              </div>
              <div className="sales-order-date me-5 mt-0">
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
       )
    }
    </div>
  );
};

export default LinkInvoiceDetails;
