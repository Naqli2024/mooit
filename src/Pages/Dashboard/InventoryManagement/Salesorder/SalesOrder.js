import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import OutBoundSaleOrderForm from "./OutBoundSaleOrderForm";
import SalesDetails from "./SalesDetails";
import InBoundSaleOrderForm from "./InBoundSaleOrderForm";

const SalesOrder = () => {
  const [activeTab, setActiveTab] = useState("outBound");
  const dispatch = useDispatch();
  const { loading, allSaleOrder, error } = useSelector(
    (state) => state.getAllSalesorder
  );
  const [openSalesDetail, setOpenSalesDetail] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [querySearch, setQuerySearch] = useState();
  const [saleOrderForm, setSaleOrderForm] = useState(false);
  const backToList = () => {
    setSaleOrderForm(false);
    setOpenSalesDetail(false);
  };
  const filteredData =
    salesData?.filter(
      (sales) =>
        sales.customerName
          ?.toLowerCase()
          .includes(querySearch?.toLowerCase() || "") ||
        sales.salesOrderId
          ?.toLowerCase()
          .includes(querySearch?.toLowerCase() || "")
    ) || [];

  useEffect(() => {
    dispatch(getAllSalesOrder());
  }, [dispatch]);

  useEffect(() => {
    if (allSaleOrder && Array.isArray(allSaleOrder)) {
      setSalesData(allSaleOrder);
    }
  }, [allSaleOrder]);

  return (
    <>
      <div className="purchase-list">
        {openSalesDetail ? (
          <SalesDetails backToList={backToList} />
        ) : (
          (saleOrderForm &&
            (activeTab === "outBound" ? (
              <OutBoundSaleOrderForm
                backToList={backToList}
                activeTab={activeTab}
              />
            ) : (
              <InBoundSaleOrderForm
                backToList={backToList}
                activeTab={activeTab}
              />
            ))) || (
            <div>
              <h2>Sales Order</h2>
              <div className="row purchase-textfield">
                <div className="col-md-4">
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="text-field"
                      placeholder="Search sales order"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={querySearch}
                      onChange={(e) => setQuerySearch(e.target.value)}
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
                <Table
                  bordered
                  className="custom-table sales-in-outbound-table"
                >
                  <thead>
                    <tr>
                      <th>Sales Order ID</th>
                      <th>Date</th>
                      <th>{activeTab === "outBound" ? "Customer" : "Store"}</th>
                      <th>Status</th>
                      <th>Packed</th>
                      <th>Shipped</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData
                        .filter(
                          (sales) =>
                            sales.saleType.toLowerCase() ===
                            activeTab.toLowerCase()
                        )
                        .map((sales, index) => (
                          <tr key={sales._id || index}>
                            <td
                              className="purchase-id"
                              onClick={() => setOpenSalesDetail(!openSalesDetail)}
                            >
                              {sales.salesOrderId}
                            </td>
                            <td>{sales.salesorderDate}</td>
                            <td>
                              {activeTab === "outBound"
                                ? sales.customerName
                                : sales.storeDepartment}
                            </td>
                            <td>{sales.status?.value}</td>
                            <td>{sales.status?.value}</td>
                            <td>{sales.status?.value}</td>
                            <td>{sales.total}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No sales orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="mt-4">
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn create-purchase-btn"
                    onClick={() => setSaleOrderForm(true)}
                  >
                    Create New
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SalesOrder;
