import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import SalesGraphView from "./SalesGraphView";
import { getConfirmedSaleOrder } from "../../../../Redux/salesOrder/getConfirmedSaleOrder";
import { useDispatch, useSelector } from "react-redux";
import { filterSaleOrderByDateRange } from "../../../../Helper/filterSaleOrderByDateRange";
import Loader from "../../../../Helper/Loader";

const Sales = () => {
  const [activeView, setActiveView] = useState("table");
  const [activeTab, setActiveTab] = useState("outBound");
  const [filter, setFilter] = React.useState("");
  const dispatch = useDispatch();
  const { loading, sales, error } = useSelector(
    (state) => state.getConfirmedSales
  );
  const [salesData, setSalesData] = useState([]);
  const [querySearch, setQuerySearch] = useState("");
  const [filteredByDateRange, setFilteredByDateRange] = useState([]);

  const handleChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    const filteredByRange = filterSaleOrderByDateRange(
      selectedFilter,
      salesData
    );
    setFilteredByDateRange(filteredByRange);
  };

  const filteredData = filteredByDateRange?.data?.filter((sale) =>
    ["salesOrderId", "customerName", "salesorderDate", "sourceDepartment"].some(
      (key) => sale?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
    )
  );

  useEffect(() => {
    if (!sales) {
      dispatch(getConfirmedSaleOrder());
    } else {
      setSalesData(sales);
      setFilteredByDateRange(sales);
    }
  }, [dispatch, sales]);

  // Directly use loading state from Redux to show the loader
  if (loading) {
    return <Loader isLoading={true} />;
  }

  return (
    <div className="purchase-list">
      <h2>Sales</h2>
      <div className="d-flex align-items-center">
        {activeView === "table" && (
          <div className="sales-text-field d-flex align-items-center">
            <div className="col-md-12 d-flex align-items-center">
              <InputGroup className="mb-0 w-100">
                <Form.Control
                  className="sales-search-field"
                  placeholder="Search sales by Id, Name, Date"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-4 ms-3 d-flex align-items-center">
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={filter}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    width: "90%",
                    height: "35px",
                    fontSize: "14px",
                  }}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="Weekly">
                    Weekly
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="Monthly">
                    Monthly
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="Yearly">
                    Yearly
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        )}
        <div className="sales-icons">
          <div
            className="list-icon"
            onClick={() => setActiveView("table")}
            style={{
              color: activeView === "table" ? "#007bff" : "black",
            }}
          >
            <TocRoundedIcon />
          </div>
          <div
            className="chart-icon"
            onClick={() => setActiveView("graph")}
            style={{
              color: activeView === "graph" ? "#007bff" : "black",
            }}
          >
            <SignalCellularAltRoundedIcon />
          </div>
        </div>
      </div>
      {activeView === "table" ? (
        <div>
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
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Sales order id</th>
                  <th>
                    {activeTab === "outBound"
                      ? "Customer name"
                      : "Source Department"}
                  </th>
                  <th>Sales date</th>
                  <th>Invoice id</th>
                  <th>Invoice date</th>
                  <th>Shipping date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 &&
                  filteredData
                    .filter(
                      (salesData) =>
                        salesData.saleType.toLowerCase() ===
                        activeTab.toLowerCase()
                    )
                    .map((saleData, index) => (
                      <tr key={index}>
                        <td className="purchase-id">{saleData.salesOrderId}</td>
                        {saleData.saleType === "outBound" ? (
                          <td>{saleData.customerName}</td>
                        ) : (
                          <td>{saleData.sourceDepartment}</td>
                        )}
                        <td>{saleData.salesorderDate}</td>
                        <td className="purchase-id"></td>
                        <td></td>
                        <td>{saleData.shipmentDate}</td>
                        <td>Shipment Status</td>
                      </tr>
                    ))}
                {filteredData?.filter(
                  (salesData) =>
                    salesData.saleType.toLowerCase() === activeTab.toLowerCase()
                ).length === 0 && (
                  <div colSpan="7" className="text-center">
                    No sales orders found for{" "}
                    {activeTab === "outBound" ? "OutBound" : "InBound"} tab
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <SalesGraphView />
      )}
    </div>
  );
};

export default Sales;
