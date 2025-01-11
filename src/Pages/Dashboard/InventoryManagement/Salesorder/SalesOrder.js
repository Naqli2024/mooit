import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/createSaleOrder";

const SalesOrder = () => {
  const [activeTab, setActiveTab] = useState("outBound");
  const dispatch = useDispatch();
  const { loading, saleOrder, error } = useSelector(
    (state) => state.getAllSalesorder
  );
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    dispatch(getAllSalesOrder());
    if (saleOrder) {
      setSalesData(saleOrder);
    }
  }, [dispatch, saleOrder]);

  return (
    <>
      <div className="purchase-list">
        <h2>Sales Order</h2>
      </div>
      <div className="row purchase-textfield">
        <div className="col-md-4">
          <InputGroup className="mb-3">
            <Form.Control
              className="text-field"
              placeholder="Search sales order"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
      </div>
      <div className="in-outbound-btn mx-5 d-flex">
        <div
          className={`btn-salesOrder ${
            activeTab === "outBound" ? "active-btn" : ""
          }`}
          onClick={() => setActiveTab("outBound")}
        >
          outBound
        </div>
        <div
          className={`btn-salesOrder ${
            activeTab === "InBound" ? "active-btn" : ""
          }`}
          onClick={() => setActiveTab("InBound")}
        >
          InBound
        </div>
      </div>
      <div className="table-container mx-5">
        <Table bordered className="custom-table sales-order-table">
          <thead>
            <tr>
              <th>Sales Order ID</th>
              <th>Date</th>
              <th>{activeTab === "outBound" ? "Customer" : "Store"}</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData
              .filter(
                (sales) =>
                  sales.saleType.toLowerCase() === activeTab.toLowerCase()
              )
              .map((sales, index) => (
                <tr key={sales._id || index}>
                  <td className="purchase-id">{sales.salesOrderId}</td>
                  <td>{sales.salesorderDate}</td>
                  <td>{sales.customerName}</td>
                  <td>{sales.itemDetails?.Total}</td>
                  <td>{sales.status?.value}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="mt-4">
        <div className="col d-flex justify-content-end">
          <button type="button" className="btn create-purchase-btn">
            Create New
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesOrder;
