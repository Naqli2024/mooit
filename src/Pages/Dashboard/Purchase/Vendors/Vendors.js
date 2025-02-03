import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import VendorDetails from "./VendorDetails";
import NewVendor from "./NewVendor";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Helper/Loader";
import { toast } from "react-toastify";
import { getAllVendors } from "../../../../Redux/vendor/vendorSlice";

const Vendors = () => {
  const [openVendorDetails, setOpenVendorDetails] = useState(false);
  const [openNewVendor, setOpenNewVendor] = useState(false);
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendor);
  const [querySearch, setQuerySearch] = useState("");

  const handleVendorDetails = (id) => {
    setOpenVendorDetails(true);
  };

  const backToList = () => {
    setOpenVendorDetails(false);
    setOpenNewVendor(false);
  };

  const filteredVendors = Array.isArray(vendors)
    ? vendors?.filter((vendor) =>
        ["firstname", "lastName", "companyName"].some((key) =>
          vendor?.basicInformation?.[key]
            ?.toLowerCase()
            .includes(querySearch.toLowerCase())
        )
      )
    : [];

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
      {error &&
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })}
      {openVendorDetails ? (
        <VendorDetails backToList={backToList} />
      ) : openNewVendor ? (
        <NewVendor backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Vendors</h2>
          <div className="row purchase-textfield">
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
          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company name</th>
                  <th>Mobile no</th>
                  <th>Email id</th>
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
