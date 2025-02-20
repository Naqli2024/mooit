import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import NewCustomer from "./NewCustomer";
import CustomerDetails from "./CustomerDetails";
import {
  deleteCustomerById,
  getAllCustomers,
  getCustomerDetailsById,
} from "../../../../Redux/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Helper/Loader";
import { toast, ToastContainer } from "react-toastify";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

const Customer = () => {
  const [openNewCustomer, setOpenNewCustomer] = useState(false);
  const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
  const dispatch = useDispatch();
  const { loading, customers, error } = useSelector((state) => state.customers);
  const [querySearch, setQuerySearch] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});

  const handleCustomerDetails = (id) => {
    setOpenCustomerDetails(true);
    dispatch(getCustomerDetailsById(id));
  };

  const backToList = () => {
    setCustomerDetails(false);
    setOpenNewCustomer(false);
    setOpenCustomerDetails(false);
    dispatch(getAllCustomers());
  };

  const filteredCustomers = Array.isArray(customers)
    ? customers?.filter((customer) =>
        ["firstName", "lastName", "companyName"].some((key) =>
          customer?.basicInformation?.[key]
            ?.toLowerCase()
            .includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleCustomerDelete = (id) => {
    dispatch(deleteCustomerById(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        dispatch(getAllCustomers());
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  };

  const handleCustomerEdit = (customerData) => {
    setOpenNewCustomer(true);
    setCustomerDetails(customerData);
  };

  useEffect(() => {
    dispatch(getAllCustomers())
      .unwrap()
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {openNewCustomer ? (
        <NewCustomer
          backToList={backToList}
          customerDetails={customerDetails}
        />
      ) : openCustomerDetails ? (
        <CustomerDetails backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Customer</h2>
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
              onClick={() => setOpenNewCustomer(true)}
            >
              Create new
            </button>
          </div>
          <div className="table-container mt-5 mx-4">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Customer Id</th>
                  <th>Name</th>
                  <th>Company name</th>
                  <th>Mobile no</th>
                  <th>Email id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers?.map((customerData) => (
                    <tr key={customerData._id}>
                      <td
                        className="purchase-id"
                        onClick={() => handleCustomerDetails(customerData._id)}
                      >
                        {customerData._id}
                      </td>
                      <td>
                        {customerData.basicInformation.firstName}{" "}
                        {customerData.basicInformation.lastName}
                      </td>
                      <td>{customerData.basicInformation.companyName}</td>
                      <td>{customerData.basicInformation.Mobile}</td>
                      <td>{customerData.basicInformation.emailId}</td>
                      <td className="list-icon">
                        <LiaEditSolid
                          onClick={() => handleCustomerEdit(customerData)}
                        />
                        <RiDeleteBin6Line
                          className="ms-2"
                          onClick={() => handleCustomerDelete(customerData._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr colSpan={4}>
                    <p>No customers found</p>
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

export default Customer;
