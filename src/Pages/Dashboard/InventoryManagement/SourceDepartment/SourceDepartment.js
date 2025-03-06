import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewDepartment from "./NewDepartment";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  deleteSourceDepartmentByDepartmentCode,
  getAllSourceDepartment,
} from "../../../../Redux/sourceDepartment/sourceDepartmentSlice";
import Loader from "../../../../Helper/Loader";
import { toast, ToastContainer } from "react-toastify";

const SourceDepartment = () => {
  const [openNewDepartment, setOpenNewDepartment] = useState(false);
  const dispatch = useDispatch();
  const { loading, sourceDepartment } = useSelector(
    (state) => state.sourceDepartment
  );
  const [querySearch, setQuerySearch] = useState("");

  const backToList = () => {
    setOpenNewDepartment(false);
  };

  const filteredData = Array.isArray(sourceDepartment)
    ? sourceDepartment.filter((dept) =>
        ["departmentName", "departmentCode"].some((key) =>
          dept?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleDelete = (id) => {
    dispatch(deleteSourceDepartmentByDepartmentCode(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        dispatch(getAllSourceDepartment());
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  };

  useEffect(() => {
    dispatch(getAllSourceDepartment());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {openNewDepartment ? (
        <NewDepartment backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Source department</h2>
          <div className="sales-return search-btn">
            <div className="col-md-4">
              <InputGroup className="search-input">
                <Form.Control
                  className="text-field search-icon-btn"
                  placeholder="Search here"
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
              onClick={() => setOpenNewDepartment(true)}
            >
              Create new
            </button>
          </div>
          <div className="table-container mx-4 mt-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code/id</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Main Contact</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((data) => (
                  <tr key={data.departmentCode}>
                    <td>{data.departmentName}</td>
                    <td>{data.departmentCode}</td>
                    <td>{data.type}</td>
                    <td>{data.location}</td>
                    <td>{data.contactPerson}</td>
                    <td>{data.status}</td>
                    <td className="list-icon">
                      <LiaEditSolid />
                      <RiDeleteBin6Line
                        className="ms-2"
                        onClick={() => handleDelete(data.departmentCode)}
                      />
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

export default SourceDepartment;
