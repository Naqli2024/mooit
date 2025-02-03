import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ShipmentDetails from "./ShipmentDetails";
import ProductNewShipment from "./ProductNewShipment";
import { statusOptions } from "../../../../Data/shipmentStatusData";
import { useDispatch, useSelector } from "react-redux";
import { getAllShipment } from "../../../../Redux/shipment/shipmentSlice";
import Loader from "../../../../Helper/Loader";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const Shipments = () => {
  const [filter, setFilter] = React.useState("");
  const [openShipmentDetails, setShipmentDetails] = useState(false);
  const [openNewShipment, setNewShipment] = useState(false);
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);
  const [querySearch, setQuerySearch] = useState("");
  const [newShipmentData, setNewShipmentData] = useState();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShipmentId = (shipmentData) => {
    setShipmentDetails(true);
    setNewShipmentData(shipmentData);
  };

  const backToList = () => {
    setShipmentDetails(false);
    setNewShipment(false);
  };

  const filteredData = Array.isArray(data)? data.filter((filtered) => {
    const isMatchingSearch = [
      "shipmentOrder",
      "salesOrderId",
      "customerName",
    ].some((key) =>
      filtered?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
    );
    const isMatchingStatus =
      filter === "" || filtered?.shipmentStatus === filter;
    return isMatchingSearch && isMatchingStatus;
  }): [];

  useEffect(() => {
    dispatch(getAllShipment());
  }, [dispatch, data]);

  return (
    <div>
      {loading && <Loader />}
      {error &&
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })}
      {openShipmentDetails ? (
        <ShipmentDetails backToList={backToList} newShipmentData={newShipmentData} />
      ) : openNewShipment ? (
        <ProductNewShipment backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Shipments</h2>
          <div className="package-text-field">
            <div className="d-md-flex">
              <div className="shipment-search-field">
                <InputGroup>
                  <Form.Control
                    placeholder="Search by product"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="col-md-3 col-sm-12 mt-2 mt-md-0 ms-md-3">
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    className="package-filter"
                    value={filter}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem
                        key={status.value}
                        sx={{ fontSize: "14px" }}
                        value={status.value}
                      >
                        <em>{status.label}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setNewShipment(true)}
            >
              New Shipment
            </button>
          </div>
          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Shipment no</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Sales order no</th>
                  <th>Package no</th>
                  <th>Carrier</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((shipmentData) => (
                    <tr>
                      <td className="purchase-id" onClick={() =>handleShipmentId(shipmentData)}>
                        {shipmentData.shipmentOrder}
                      </td>
                      <td>{shipmentData.shipmentDate}</td>
                      <td>{shipmentData.customerName}</td>
                      <td className="purchase-id">
                        {shipmentData.salesOrderId}
                      </td>
                      <td>{shipmentData.packageSlip}</td>
                      <td>{shipmentData.carrier}</td>
                      <td className="delivered-text">
                        {shipmentData.shipmentStatus}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Shipments;
