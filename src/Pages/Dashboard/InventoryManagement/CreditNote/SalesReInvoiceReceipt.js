import React from "react";
import Table from "react-bootstrap/Table";

const SalesReInvoiceReceipt = () => {
  return (
    <div className="sales-invoice-outer-card mt-5">
      <p className="paid-label">Paid</p>
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
              <p className="col-7">Invoice date</p>
              <p className="col-2">:</p>
              <p className="col-2">23/04/2024</p>
            </div>
            <div className="d-flex">
              <p className="col-7">Due date</p>
              <p className="col-2">:</p>
              <p className="col-2">23/04/2024</p>
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
  );
};

export default SalesReInvoiceReceipt;
