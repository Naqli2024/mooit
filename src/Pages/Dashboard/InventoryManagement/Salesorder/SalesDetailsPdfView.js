import React from "react";
import { Table } from "react-bootstrap";

const SalesDetailsPdfView = ({ status }) => {
  return (
    <div>
      <div
        className={
          status === "Approve"
            ? "approve-text status-text"
            : status === "Confirmed"
            ? "confirm-text status-text"
            : "draft-text status-text"
        }
      >
        {status}
      </div>
      <div className="sales-invoice-outer-card">
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading">
              <div className="fw-bold">LOGO</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="fw-bold fs-5">Sales Order</div>
              <div className="sales-id-text">Sales order#9605</div>
            </div>
          </div>
          <div className="sales-invoice">
            <div className="sales-order-bill">
              <div>Bill to</div>
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="mb-2">Order date: 21/02/2024</div>
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
          <div className="sales-invoice-bottom-content">
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

export default SalesDetailsPdfView;
