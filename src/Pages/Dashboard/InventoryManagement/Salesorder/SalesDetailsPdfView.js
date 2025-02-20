import { Table } from "react-bootstrap";
import React, { useEffect, useRef } from "react";

const SalesDetailsPdfView = React.forwardRef(
  ({ saleOrderData, status }, ref) => {
    return (
      <div ref={ref}>
        <div
          className={
            saleOrderData?.status.value === "Approved"
              ? "approve-text status-text sales-invoice-outer-card mb-1"
              : saleOrderData?.status.value === "Confirmed"
              ? "confirm-text status-text sales-invoice-outer-card mb-1"
              : "draft-text status-text sales-invoice-outer-card mb-1"
          }
        >
          <b>{status} </b>
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
                <div className="sales-id-text">
                  Sales order #{saleOrderData?.salesOrderId}
                </div>
              </div>
            </div>
            <div className="sales-invoice">
              <div className="sales-order-bill">
                <div>Bill to</div>
                <div>xxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxx</div>
              </div>
              <div className="sales-order-date">
                <div className="mb-2">
                  Order date: {saleOrderData?.salesorderDate}
                </div>
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
                  {saleOrderData?.itemDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.discount}</td>
                      <td>{item.gst}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="sales-invoice-bottom-content">
              <div className="sales-invoice-total col-4">
                <div className="">Sub total</div>
                <div className="col-2">{saleOrderData?.subTotal}</div>
              </div>
              <div className="sales-invoice-total col-4">
                <div className="">Shipping charges</div>
                <div className="col-2">{saleOrderData?.shipmentCharges}</div>
              </div>
              <hr className="amount-divider" />
              <div className="sales-invoice-total col-4">
                <div className="fw-bold">Total amount</div>
                <div className="fw-bold col-2">{saleOrderData?.total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SalesDetailsPdfView;
