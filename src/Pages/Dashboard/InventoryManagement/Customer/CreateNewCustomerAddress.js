import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers, updateOrCreateCustomer } from "../../../../Redux/customer/customerSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../../Helper/Loader";

const CreateNewCustomerAddress = ({ backToList, customers }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.customers);

  const [formData, setFormData] = useState({
    billingAddress: {
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
      phoneNo: "",
    },
    shippingAddress: {
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
      phoneNo: "",
    },
  });

  // Update formData when customers is available
  useEffect(() => {
    if (customers) {
      setFormData({
        billingAddress: customers.billingAddress || {
          country: "",
          state: "",
          city: "",
          street: "",
          zipCode: "",
          phoneNo: "",
        },
        shippingAddress: customers.shippingAddress || {
          country: "",
          state: "",
          city: "",
          street: "",
          zipCode: "",
          phoneNo: "",
        },
      });
    }
  }, [customers]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parts = name.split(".");
    if (parts.length !== 2) {
      console.error("Invalid input name format:", name);
      return;
    }
    const [section, field] = parts;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (customers) {
      dispatch(
        updateOrCreateCustomer({
          id: customers?.data?._id || customers?._id,
          data: formData,
        })
      )
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
          setFormData({
            billingAddress: {
              country: "",
              state: "",
              city: "",
              street: "",
              zipCode: "",
              phoneNo: "",
            },
            shippingAddress: {
              country: "",
              state: "",
              city: "",
              street: "",
              zipCode: "",
              phoneNo: "",
            },
          });
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
        });
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error &&
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })}
      <div className="vendor-address-overview new-vendor-address">
        {/* Billing Address */}
        <div className="new-vendor-address-left-content">
          <div className="fw-bold">Billing address</div>
          {["country", "state", "city", "street", "zipCode", "phoneNo"].map(
            (field) => (
              <div className="new-vendor-content" key={field}>
                <div className="col-md-8">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </div>
                <div className="col-md-8">
                  <InputGroup className="col-md-4">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name={`billingAddress.${field}`}
                      value={formData.billingAddress[field]}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
              </div>
            )
          )}
        </div>

        <div className="new-vertical-divider"></div>

        {/* Shipping Address */}
        <div className="new-vendor-address-right-content">
          <div className="fw-bold">Shipping address</div>
          {["country", "state", "city", "street", "zipCode", "phoneNo"].map(
            (field) => (
              <div className="new-vendor-content" key={field}>
                <div className="col-md-8">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </div>
                <div className="col-md-8">
                  <InputGroup className="col-md-4">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name={`shippingAddress.${field}`}
                      value={formData.shippingAddress[field]}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <hr />
      <div className="container-fluid p-4">
        <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
          <button
            type="submit"
            className="btn flex-grow-1"
            style={{ color: "white", backgroundColor: "#1F3F7F" }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateNewCustomerAddress;
