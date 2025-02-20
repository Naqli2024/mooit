import React, { useEffect, forwardRef } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findPurchaseById } from "../../../../Redux/features/findPurchaseByIdSlice";


const CreateInvoice = forwardRef((props, ref) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, data = {}, error } = useSelector(
    (state) => state.findPurchaseById
  );

  useEffect(() => {
    if (id) {
      dispatch(findPurchaseById(id));
    }
  }, [id, dispatch]);

  return (
    <div ref={ref}>
      <div className="create-invoice-outer-card">
        <div className="invoice-heading">INVOICE</div>
        <div className="create-invoice-content">
          <div className="mt-3 invoice-content">
            <div className="col-md-6">Invoice no: {data?.invoiceNo || "N/A"}</div>
            <div className="col-md-6 text-md-end">Order date: 11/5/2024</div>
          </div>
          <div className="mt-3 invoice-content">
            <div className="col-md-6">Invoice date: {data?.invoiceDate || "N/A"}</div>
            <div className="col-md-6 text-md-end">Delivery date: 7/6/2024</div>
          </div>
          <div className="mt-5 invoice-content">
            <div className="col-md-6 fw-bold">Vendor address</div>
            <div className="col-md-6 fw-bold text-md-end">Delivery address</div>
          </div>
          <div className="mt-3 invoice-content">
            <div className="col-md-6">xxxxxxxxxxxxxxxxxx</div>
            <div className="col-md-6 text-md-end">xxxxxxxxxxxxxxxxxx</div>
          </div>
          <div className="row invoice-table">
            <Table className="table-content">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td>{data?.quantity || 0}</td>
                  <td>{data?.unitPrice || 0}</td>
                  <td>{(data?.quantity || 0) * (data?.unitPrice || 0)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="table-bottom-content">
            <div className="col-md-5">Subtotal</div>
            <div className="col-md-5">Discount</div>
            <div className="col-md-5 invoice-bottom">
              <div className="col-md-2">GST</div>
              <div className="col-md-3">{data?.GST || 0}</div>
            </div>
            <div className="col-md-5">Shipping/Handling</div>
            <div className="col-md-5 fw-bold mb-5">Total amount</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateInvoice;
