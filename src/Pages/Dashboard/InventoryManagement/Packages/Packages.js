import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PackageDetails from "./PackageDetails";
import NewPackage from "./NewPackage";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../../../Redux/package/getAllPackages";
import Loader from "../../../../Helper/Loader";
import { getShipmentDetails } from "../../../../Redux/shipment/shipmentSlice";
import { toast, ToastContainer } from "react-toastify";
import { statusOptions } from "../../../../Data/shipmentStatusData";

const Packages = () => {
  const [filter, setFilter] = React.useState("");
  const [openPackageDetails, setPackageDetails] = useState(false);
  const [packageData, setpackageData] = useState();
  const [openNewPackage, setNewPackage] = useState(false);
  const dispatch = useDispatch();
  const { loading, packageList } = useSelector((state) => state.getAllPackages);
  const { data } = useSelector((state) => state.shipment);
  const [querySearch, setQuerySearch] = useState("");

  const handleNewPackage = () => {
    setNewPackage(true);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePackageId = (packages) => {
    setPackageDetails(true);
    setpackageData(packages);
  };

  const backToList = () => {
    setPackageDetails(false);
    setNewPackage(false);
    dispatch(getAllPackages());
  };

  const filterData = packageList?.filter((list) => {
    const isMatchingSearch = [
      "packageSlip",
      "salesOrderId",
      "customerName",
    ].some((key) =>
      list?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
    );

    const isMatchingStatus = filter === "" || list?.shipmentStatus === filter;
    return isMatchingSearch && isMatchingStatus;
  });

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  useEffect(() => {
    if (packageList?.length > 0) {
      packageList.forEach((packageItem) => {
        const salesOrderId = packageItem?.salesOrderId;

        if (salesOrderId) {
          dispatch(getShipmentDetails(salesOrderId));
        }
      });
    }
  }, [dispatch, packageList]);

  return (
    <div>
      {loading && <Loader />}
      {openPackageDetails ? (
        <PackageDetails backToList={backToList} packageDetail={packageData} />
      ) : openNewPackage ? (
        <NewPackage backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Packages</h2>
          <div className="package-text-field">
            <div className="d-md-flex">
              <div className="sales-search-field">
                <InputGroup>
                  <Form.Control
                    placeholder="Search by package Id, Customer, Sales Id"
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
              onClick={handleNewPackage}
            >
              New Package
            </button>
          </div>
          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Package id</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Carrier</th>
                  <th>Sales order</th>
                  <th>Status</th>
                  <th>Shipment date</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filterData?.length > 0 ? (
                  filterData.map((packages) => {
                    const totalQuantity = packages.itemDetails?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    );
                    return (
                      <tr key={packages.packageSlip}>
                        <td
                          className="purchase-id"
                          onClick={() => handlePackageId(packages)}
                        >
                          {packages.packageSlip}
                        </td>
                        <td>{packages.packageDate || "-"}</td>
                        <td>{packages.customerName || "-"}</td>
                        <td>{packages.carrier}</td>
                        <td className="purchase-id">
                          {packages.salesOrderId || "-"}
                        </td>
                        <td>{packages.shipmentStatus}</td>
                        <td>{packages.shipmentDate}</td>
                        <td>{totalQuantity || 0}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      No Packges Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Packages;
