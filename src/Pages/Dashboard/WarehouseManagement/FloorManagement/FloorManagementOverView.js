import React, { useState, lazy, Suspense, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteWarehouse, getAllWarehouses } from "../../../../Redux/floorManagement/warehouseSlice";
import Loader from "../../../../Helper/Loader";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewFloorManagement from "./NewFloorManagement";
import { toast } from "react-toastify";
const FloorManagementDetails = lazy(() => import("./FloorManagementDetails"));

const FloorManagementOverView = ({ backToList }) => {
  const [openFloorDetails, setOpenFloorDetails] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.warehouse);
  const [querySearch, setQuerySearch] = useState("");
  const [warehouseDetails, setWarehouseDetails] = useState();
  const [openNewFloorManagement, setOpenNewFloorManagement] = useState(false);

  const formatDateAndTime = (dateTimeString) => {
    if (!dateTimeString) return "-"; // Handle cases where createdAt is undefined or null

    const date = new Date(dateTimeString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date strings

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((action) =>
        ["warehouseName", "warehouseManager"].some((key) =>
          action?.[key].toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleWarehouseDetails = (data) => {
    setWarehouseDetails(data);
    setOpenFloorDetails(true);
  };

  const handleFloorManagement = () => {
    setOpenNewFloorManagement(true);
  }

  const handleWarehouseDelete = (id) => {
    dispatch(deleteWarehouse(id))
    .unwrap()
    .then((response) => {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        closeButton: false
      })
      setTimeout(() => dispatch(getAllWarehouses()), 1000)
    })
    .catch((error) => toast.error(error))
  }

  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);

  return (
    <div>
      {openNewFloorManagement ? (
        <NewFloorManagement setOpenNewFloorManagement={setOpenNewFloorManagement}/>
      ) : openFloorDetails ? (
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center">
              <Loader isLoading={true} />
              <p className="lazy-loading-text mt-2">
                Loading Floor Management Overview...
              </p>
            </div>
          }
        >
          <FloorManagementDetails
            backToList={() => setOpenFloorDetails(false)}
            warehouseDetails={warehouseDetails}
          />
        </Suspense>
      ) : (
        <div className="purchase-list">
          <h2>Floor Management</h2>
          <div className="sales-return search-btn">
            <div className="col-md-4">
              <InputGroup className="search-input">
                <Form.Control
                  className="text-field search-icon-btn"
                  placeholder="Search warehouse"
                  aria-label="Search"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
                <div className="divider"></div>
                <Button variant="outline-secondary" className="search-icon-btn">
                  <FaSearch />
                </Button>
              </InputGroup>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={handleFloorManagement}
            >
              Create new
            </button>
          </div>
          <div className="table-container mt-5 mx-4">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Warehouse name</th>
                  <th>Warehouse Manager</th>
                  <th>Location</th>
                  <th>Created on</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <tr key={data?._id}>
                      <td
                        className="purchase-id"
                        onClick={() => handleWarehouseDetails(data)}
                      >
                        {data?.warehouseName}
                      </td>
                      <td>{data?.warehouseManager}</td>
                      <td>{data?.address}</td>
                      <td>{formatDateAndTime(data?.createdAt)}</td>
                      <td>{data?.status}</td>
                      <td className="list-icon">
                        <LiaEditSolid />
                        <RiDeleteBin6Line className="ms-2" onClick={() =>handleWarehouseDelete(data?._id)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No warehouse found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorManagementOverView;
