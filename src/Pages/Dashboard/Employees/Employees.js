import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { InputGroup, Form } from "react-bootstrap";
import NewEmployees from "./NewEmployees";
import EmployeeDetails from "./EmployeeDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployeeByEmployeeId,
  getAllEmployee,
} from "../../../Redux/employee/employeeSlice";
import Loader from "../../../Helper/Loader";
import { profilePhoto } from "../../../Helper/fetchProfilePhoto";
import { toast, ToastContainer } from "react-toastify";

const Employees = () => {
  const [openNewEmployees, setOpenNewEmployees] = useState(false);
  const [openNewEmployeeDetails, setOpenNewEmployeeDetails] = useState(false);
  const dispatch = useDispatch();
  const { loading, employee } = useSelector((state) => state.employee);
  const [querySearch, setQuerySearch] = useState("");
  const [showEmployeeDetails, setShowEmployeeDetails] = useState();
  const [toEditData, setToEditData] = useState();

  const filteredData = Array.isArray(employee)
    ? employee.filter((data) =>
        ["firstName", "emailId", "employeeId"].some((key) =>
          data?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const backToList = () => {
    setOpenNewEmployees(false);
    setOpenNewEmployeeDetails(false)
    dispatch(getAllEmployee());
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployeeByEmployeeId(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => dispatch(getAllEmployee()), 1000)
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  };

  const handleEdit = (data) => {
    setOpenNewEmployees(!openNewEmployeeDetails);
    setToEditData(data)
  }

  const handleEmployeeDetails = (data) => {
    setOpenNewEmployeeDetails(true);
    setShowEmployeeDetails(data);
  };

  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {openNewEmployees ? (
        <NewEmployees backToList={backToList} toEditData={toEditData} setToEditData={setToEditData}/>
      ) : openNewEmployeeDetails ? (
        <EmployeeDetails
          backToList={backToList}
          employee={showEmployeeDetails}
          setOpenNewEmployeeDetails={setOpenNewEmployeeDetails}
        />
      ) : (
        <div className="purchase-list">
          <h2>Employees</h2>
          <div className="sales-return search-btn">
            <div className="col-md-4">
              <InputGroup className="search-input">
                <Form.Control
                  className="text-field search-icon-btn"
                  placeholder="Search by emp.Id, Name, Email"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                  aria-label="Search"
                />
              </InputGroup>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setOpenNewEmployees(true)}
            >
              Create new
            </button>
          </div>
          <div className="table-container mx-4 mt-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Employee name</th>
                  <th>Employee id</th>
                  <th>Email id</th>
                  <th>Mobile no</th>
                  <th>Access to</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center gap-3">
                        <div className="personAvatar">{profilePhoto(data)}</div>
                        {data.firstName} {data.lastName}
                      </td>
                      <td
                        className="purchase-id"
                        onClick={() => handleEmployeeDetails(data)}
                      >
                        {data.employeeId}
                      </td>
                      <td>{data.emailId}</td>
                      <td>{data.mobileNo}</td>
                      <td>{data.accessTo}</td>
                      <td className="list-icon">
                        <LiaEditSolid onClick={() => handleEdit(data)}/>
                        <RiDeleteBin6Line
                          className="ms-2"
                          onClick={() => handleDelete(data.employeeId)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr colSpan={6}>
                    <td>No Employee Found</td>
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

export default Employees;
