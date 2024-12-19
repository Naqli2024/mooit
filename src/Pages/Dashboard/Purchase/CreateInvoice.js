import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "react-bootstrap/Table";

const CreateInvoice = ({ backToPurchaseDetails }) => {
  return (
    <div>
        <div className="create-invoice-outer-card">
          <div className="invoice-heading">INVOICE</div>
          <div className="create-invoice-content">
          <div className="mt-3 invoice-content">
            <div className="col-md-6">Invoice no: 5465746</div>
            <div className="col-md-6 text-md-end">Order date: 11/5/2024</div>
          </div>
          <div className="mt-3 invoice-content">
            <div className="col-md-6">Invoice date:12/6/2024</div>
            <div className="col-md-6 text-md-end">Delivery date:7/6/2024</div>
          </div>
          <div className="mt-5 invoice-content">
            <div className="col-md-6 fw-bold">Vendor address</div>
            <div className="col-md-6 fw-bold text-md-end">Delivery address</div>
          </div>
          <div className="mt-3 invoice-content">
            <div className="col-md-6">xxxxxxxxxxxxxxxxxx</div>
            <div className="col-md-6 text-md-end">xxxxxxxxxxxxxxxxxx</div>
          </div>
          <div className="invoice-content">
            <div className="col-md-6">xxxxxxxxxxxxxxxxxx</div>
            <div className="col-md-6 text-md-end">xxxxxxxxxxxxxxxxxx</div>
          </div>
          <div className="invoice-content">
            <div className="col-md-6">xxxxxxxxxxxxxxxxxx</div>
            <div className="col-md-6 text-md-end">xxxxxxxxxxxxxxxxxx</div>
          </div>
          <div className="invoice-content">
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
                  <td>71</td>
                  <td>349</td>
                  <td>25,128</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="table-bottom-content">
            <div className="col-md-5">Subtotal</div>
            <div className="col-md-5">Discount</div>
            <div className="col-md-5">GST</div>
            <div className="col-md-5">Shipping/Handling</div>
            <div className="col-md-5 fw-bold mb-5">Total amount</div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default CreateInvoice;
