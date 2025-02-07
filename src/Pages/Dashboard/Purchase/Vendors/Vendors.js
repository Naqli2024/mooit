import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import VendorDetails from "./VendorDetails";
import NewVendor from "./NewVendor";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Helper/Loader";
import { toast } from "react-toastify";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteVendorById,
  getAllVendors,
  getVendorDetailsById,
} from "../../../../Redux/vendor/vendorSlice";

const Vendors = () => {
  const [openVendorDetails, setOpenVendorDetails] = useState(false);
  const [openNewVendor, setOpenNewVendor] = useState(false);
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendor);
  const [querySearch, setQuerySearch] = useState("");
  const [vendorDetails, setVendorDetails] = useState({});

  const handleVendorDetails = (id) => {
    setOpenVendorDetails(true);
    dispatch(getVendorDetailsById(id));
  };

  const backToList = () => {
    setOpenVendorDetails(false);
    setOpenNewVendor(false);
    dispatch(getAllVendors());
  };

  const filteredVendors = Array.isArray(vendors)
    ? vendors?.filter((vendor) =>
        ["firstName", "lastName", "companyName"].some((key) =>
          vendor?.basicInformation?.[key]
            ?.toLowerCase()
            .includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleVendorDelete = (id) => {
    dispatch(deleteVendorById(id))
      .unwrap()
      .then(
        (response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
          dispatch(getAllVendors())
        },
      )
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  };

  const handleVendorEdit = (vendorData) => {
    setOpenNewVendor(true);
    setVendorDetails(vendorData);
  }

  useEffect(() => {
    dispatch(getAllVendors())
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
      {openVendorDetails ? (
        <VendorDetails backToList={backToList} />
      ) : openNewVendor ? (
        <NewVendor backToList={backToList} vendorDetails={vendorDetails}/>
      ) : (
        <div className="purchase-list">
          <h2>Vendors</h2>
          <div className="row purchase-textfield-vendors">
            <div className="col-md-4">
              <InputGroup className="mb-3">
                <Form.Control
                  className="text-field"
                  placeholder="Search by name, company name"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
              </InputGroup>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setOpenNewVendor(true)}
            >
              New vendor
            </button>
          </div>
          <div className="table-container">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company name</th>
                  <th>Mobile no</th>
                  <th>Email id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.length > 0 ? (
                  filteredVendors?.map((vendorData) => (
                    <tr key={vendorData._id}>
                      <td
                        className="purchase-id"
                        onClick={() => handleVendorDetails(vendorData._id)}
                      >
                        {vendorData.basicInformation.firstName}{" "}
                        {vendorData.basicInformation.lastName}
                      </td>
                      <td>{vendorData.basicInformation.companyName}</td>
                      <td>{vendorData.basicInformation.Mobile}</td>
                      <td>{vendorData.basicInformation.emailId}</td>
                      <td className="list-icon">
                        <LiaEditSolid onClick={() => handleVendorEdit(vendorData)}/>
                        <RiDeleteBin6Line
                          className="ms-2"
                          onClick={() => handleVendorDelete(vendorData._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr colSpan={4}>
                    <p>No vendors found</p>
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

export default Vendors;
