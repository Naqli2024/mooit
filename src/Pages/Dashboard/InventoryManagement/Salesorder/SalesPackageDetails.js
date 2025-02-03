import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Table } from "react-bootstrap";
import SalesShipment from "./SalesShipment";
const SalesPackageDetails = ({ backToList }) => {
  const [openSalesShipment, setSalesShipment] = useState(false);
  const handleSalesShipment = () => {
    setSalesShipment(true);
  };
  return (
    <div>
      {openSalesShipment ? (
        <SalesShipment backToList={() => setSalesShipment(!setSalesShipment)} />
      ) : (
        <div>
          <h2>PKG-65746</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="edit-print-del-btn mt-3">
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
            <div className="action-btn print-btn" onClick={handleSalesShipment}>
              Ship
            </div>
            <div className="divider"></div>
          </div>
          <div className="sales-invoice-outer-card mt-5">
            <div className="sales-invoice-detail">
              <div className="sales-invoice">
                <div className="sales-invoice-heading">
                  <div className="fw-bold">LOGO</div>
                  <div className="sales-id-text">xxxxxxxxxxxxx</div>
                  <div className="sales-id-text">xxxxxxxxxxxxx</div>
                </div>
                <div className="sales-order-date">
                  <div className="fw-bold fs-5">Package</div>
                  <div className="sales-id-text">Package#7688</div>
                </div>
              </div>
              <div className="package-details">
                <div>Package id:7589379</div>
                <div>Package date:12/08/2024</div>
                <div>order date:12/08/2024</div>
                <div>Sales order:7689379</div>
              </div>
              <div className="sales-invoice">
                <div className="sales-order-bill">
                  <div className="fw-bold">Ship to</div>
                  <div>xxxxxxxxxxxx</div>
                  <div>xxxxxxxxxxxx</div>
                  <div>xxxxxxxxxxxx</div>
                </div>
              </div>
              <div className="row invoice-table">
                <Table className="table-content sales-invoice-table">
                  <thead>
                    <tr>
                      <th>Item & Description</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>xxxxxxxxxxxxxxx</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default SalesPackageDetails;