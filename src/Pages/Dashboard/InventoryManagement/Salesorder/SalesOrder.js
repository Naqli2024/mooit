import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import OutBoundSaleOrderForm from "./OutBoundSaleOrderForm";
import SalesDetails from "./SalesDetails";
import InBoundSaleOrderForm from "./InBoundSaleOrderForm";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";

const SalesOrder = () => {
  const [activeTab, setActiveTab] = useState("outBound");
  const dispatch = useDispatch();
  const { loading, allSaleOrder, error } = useSelector(
    (state) => state.getAllSalesorder
  );
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const [openSalesDetail, setOpenSalesDetail] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [querySearch, setQuerySearch] = useState();
  const [saleOrderForm, setSaleOrderForm] = useState(false);
  const backToList = () => {
    setSaleOrderForm(false);
    setOpenSalesDetail(false);
    dispatch(getAllSalesOrder());
  };
  const filteredData =
    salesData?.filter(
      (sales) =>
        sales.saleType.toLowerCase() === activeTab.toLowerCase() &&
        (sales.customerName
          ?.toLowerCase()
          .includes(querySearch?.toLowerCase() || "") ||
          sales.salesOrderId
            ?.toLowerCase()
            .includes(querySearch?.toLowerCase() || ""))
    ) || [];

  const handleSaleOrderDetail = (saleOrderId) => {
    setOpenSalesDetail(!openSalesDetail);
    dispatch(getSaleOrderBySaleOrderId(saleOrderId));
  };

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
          <SalesDetails backToList={backToList} saleOrderData={saleOrderData} />
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
              <div className="package-text-field">
                <div className="d-md-flex">
                  <div className="shipment-search-field">
                    <InputGroup>
                      <Form.Control
                        className="text-field"
                        placeholder="Search sales orderId"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={querySearch}
                        onChange={(e) => setQuerySearch(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn create-new-btn"
                  onClick={() => setSaleOrderForm(true)}
                >
                  Create New
                </button>
              </div>
              <div className="in-outbound-btn mx-5 d-flex">
                <div
                  className={`btn-salesOrder ${
                    activeTab === "outBound" ? "active-btn" : ""
                  }`}
                  onClick={() => setActiveTab("outBound")}
                >
                  OutBound
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
                      <th>
                        {activeTab === "outBound"
                          ? "Customer"
                          : "Source Department"}
                      </th>
                      <th>Status</th>
                      <th>Packed</th>
                      <th>Shipped</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.length === 0 ? (
                      // No sales data fetched
                      <tr>
                        <td colSpan="7" className="text-center">
                          No sales data found
                        </td>
                      </tr>
                    ) : filteredData.length > 0 ? (
                      // Render filtered results if available
                      filteredData.map((sales, index) => (
                        <tr key={sales._id || index}>
                          <td
                            className="purchase-id"
                            onClick={() => {
                              if (sales && sales.salesOrderId) {
                                handleSaleOrderDetail(sales.salesOrderId);
                              }
                            }}
                          >
                            {sales.salesOrderId}
                          </td>
                          <td>{sales.salesorderDate}</td>
                          <td>
                            {activeTab === "outBound"
                              ? sales.customerName
                              : sales.sourceDepartment}
                          </td>
                          <td>{sales.deliveryStatus === "Delivered" ? "Delivered" : sales.status?.value}</td>
                          <td>{sales.packed}</td>
                          <td>{sales.shipped}</td>
                          <td>{sales.total}</td>
                        </tr>
                      ))
                    ) : (
                      // No filtered results match the query
                      <tr>
                        <td colSpan="7" className="text-center">
                          No sales orders found for{" "}
                          {activeTab === "outBound" ? "OutBound" : "InBound"}{" "}
                          tab
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SalesOrder;
