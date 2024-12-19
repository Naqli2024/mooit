import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateInvoice from "./CreateInvoice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

const PurchaseDetails = ({ backToList }) => {
  const [openInvoice, setOpenInvoice] = useState(false);

  const backToPurchaseDetails = () => {
    setOpenInvoice(!openInvoice);
  };
  return (
    <div>
      {openInvoice ? (
        <CreateInvoice backToPurchaseDetails={backToPurchaseDetails} />
      ) : (
        <>
          <h2>Purchase</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="row invoice-btn">
            <div className="invoice-btn">
              <div>#PC-8697869</div>
              <button
                type="button"
                className="btn create-invoice-btn"
              >
                Create invoice
              </button>
            </div>
          </div>
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
            <div className="action-btn delete-btn">
              <DeleteOutlineSharpIcon className="action-icon" />
              Delete
            </div>
            <div className="divider"></div>
          </div>
          <div class="outer-card shadow">
            <div class="row justify-content-evenly">
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>Part number</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>HNS code</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>Quantity</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>MRP</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
            </div>
            <div class="row justify-content-evenly mt-5">
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>GST</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>Advance payment</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>Brand name</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
              <div class="col-md-2 p-3 text-center invoice-card">
                <p>Category</p>
                <p className="invoice-id">65GFDGIGI5224</p>
              </div>
            </div>
            <CreateInvoice />
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseDetails;
