import React from "react";
import Table from "react-bootstrap/Table";

const SalesInvoiceReceipt = ({ salesInvoice }) => {
  const invoiceHistoryLatest =
    salesInvoice.invoiceHistory.length > 0
      ? salesInvoice.invoiceHistory[salesInvoice.invoiceHistory.length - 1]
      : null;

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
            <p className="detail-heading mb-2 fw-bold">Original Invoice</p>
            <p className="sales-id-text">{invoiceHistoryLatest?.invoiceId}</p>
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
              <p className="col-5">SO#</p>
              <p className="col-2">:</p>
              <p className="col-6">{invoiceHistoryLatest?.salesOrderId}</p>
            </div>
            <div className="d-flex mb-3">
              <p className="col-5">Invoice date</p>
              <p className="col-2">:</p>
              <p className="col-6">{invoiceHistoryLatest?.invoiceDate}</p>
            </div>
            <div className="d-flex">
              <p className="col-5">Due date</p>
              <p className="col-2">:</p>
              <p className="col-6">{invoiceHistoryLatest?.dueDate}</p>
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
              {invoiceHistoryLatest?.itemDetails.length > 0 ? (
                invoiceHistoryLatest?.itemDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="item-name-text">{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.gst}%</td>
                    <td>{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr colSpan={7}>
                  <td>No data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="credit-note-bottom-content">
          <div className="open-inventory mb-3">
            <p className="col-md-8">Subtotal</p>
            <p className="col-md-3 d-flex justify-content-center">
              {invoiceHistoryLatest?.subTotal}
            </p>
          </div>
          <div className="open-inventory mb-3">
            <p className="col-md-8">Shipping charges</p>
            <p className="col-md-3 d-flex justify-content-center">
              {invoiceHistoryLatest?.shippingCharges}
            </p>
          </div>
          <div className="open-inventory mb-3">
            <p className="col-md-8">VAT%</p>
            <p className="col-md-3 d-flex justify-content-center">
              {invoiceHistoryLatest?.VAT}
            </p>
          </div>
          <div className="open-inventory fw-bold">
            <p className="col-md-8">Total amount</p>
            <p className="col-md-3 d-flex justify-content-center">
              {invoiceHistoryLatest?.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceReceipt;
