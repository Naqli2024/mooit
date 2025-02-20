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
import SalesReInvoiceReceipt from "./SalesReInvoiceReceipt";

const SalesReInvoiceDetails = ({backToList}) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const openIcon = Boolean(openMoreIcon);

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
              <SalesReInvoiceReceipt />
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
              <SalesReInvoiceReceipt />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <SalesReInvoiceReceipt />
    </div>
  );
};

export default SalesReInvoiceDetails;
