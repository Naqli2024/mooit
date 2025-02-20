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
import Table from "react-bootstrap/Table";
import SalesNewReInvoice from "./SalesNewReInvoice";

const ReviseInvoice = ({backToList}) => {
    const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
    const [openSalesReInvoice, setOpenSalesReInvoice] = useState(false);
    const openIcon = Boolean(openMoreIcon);
  
    const handleClick = (event) => {
      setOpenMoreIcon(event.currentTarget);
    };

  return (
    <div>
        {openSalesReInvoice ? <SalesNewReInvoice backToList={()=>(setOpenSalesReInvoice(false))}/>
        : (<div className="purchase-list">
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
              <div className="ms-2 me-2 cursor-pointer" onClick={()=>(setOpenSalesReInvoice(true))}>Revise Invoice</div>
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
                  borderBottom: "1px solid #ddd",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Credit note</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="credit-note-id">CN-9595</div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="sales-invoice-outer-card mt-5">
                  <p className="paid-label">Paid</p>
                  <div className="sales-invoice-detail">
                    <div className="sales-invoice">
                      <div className="sales-invoice-heading mt-2">
                        <p>LOGO</p>
                        <p className="sales-id-text">xxxxxxxxxxxxx</p>
                        <p className="sales-id-text">xxxxxxxxxxxxx</p>
                      </div>
                      <div className="sales-order-date">
                        <p className="detail-heading mb-1">Invoice</p>
                        <p className="sales-id-text">Invoice number:#76857677</p>
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
                      <p className="col-2">82545532</p>
                    </div>
                    <div className="d-flex mb-3 me-5">
                      <p className="col-8">Invoice date</p>
                      <p className="col-2">:</p>
                      <p className="col-2">#3654363</p>
                    </div>
                    <div className="d-flex mb-3 me-5">
                      <p className="col-8">Due date</p>
                      <p className="col-2">:</p>
                      <p className="col-2">23/04/2024</p>
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
                          <tr>
                            <td>1</td>
                            <td className="item-name-text">xxxxxxx</td>       
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
                  <div className="credit-note-bottom-content me-5">
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
        )}
    </div>
  )
}

export default ReviseInvoice