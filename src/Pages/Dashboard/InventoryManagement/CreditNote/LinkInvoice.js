import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "react-bootstrap/Table";
import LinkInvoiceDetails from "./LinkInvoiceDetails";

const LinkInvoice = ({ backToList }) => {
  const [openLinkToInvoiceDetails, setOpenLinkToInvoiceDetails] = useState(false);

  const handleSubmit = () => {
    setOpenLinkToInvoiceDetails(true);
  };

  return (
    <div>
      {openLinkToInvoiceDetails ? (
        <LinkInvoiceDetails
          backToList={() => setOpenLinkToInvoiceDetails(false)}
        />
      ) : (
        <div className="purchase-list">
          <h2>Draw credit from CN-0034</h2>
          <div className="link-invoice">
            <button onClick={backToList} className="goBack-btn ms-0">
              <span>
                <ArrowBackIosIcon />
              </span>
              Back
            </button>
            <div className="d-flex justify-content-end me-3">
              <p>
                Remaining credit:<span className="fw-bold">50</span>
              </p>
            </div>
            <div className="table-container">
              <Table
                bordered
                className="custom-table sales-in-outbound-table delivery-tableHeader"
              >
                <thead>
                  <tr>
                    <th>Invoice no</th>
                    <th>Invoice date</th>
                    <th>Invoice amount</th>
                    <th className="amount-credit">Amount to credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IN-43259595</td>
                    <td>24/4/2024</td>
                    <td>23,454</td>
                    <td className="text-center ">
                      <input
                        type="text"
                        className="mx-auto text-end d-inline-block"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>IN-43259595</td>
                    <td>24/4/2024</td>
                    <td>23,454</td>
                    <td className="text-center">
                      <input
                        type="text"
                        className="mx-auto text-end d-inline-block"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="sales-invoice-bottom-content mb-5 me-0 me-3 d-flex justify-content-end mb-3">
              <div className="sales-invoice-total col-md-4 gap-2">
                <p className="">Amount to credit</p>
                <p className="col-md-2 fw-bold ms-2">0.00</p>
              </div>
              <div className="remaining-credit col-md-4 gap-2">
                <p className="">Remaining credit</p>
                <p className="col-md-2 fw-bold">50</p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center p-3">
              <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{ color: "white", backgroundColor: "#1F3F7F" }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={backToList}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkInvoice;
