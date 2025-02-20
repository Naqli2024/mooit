import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewCustomer,
  updateOrCreateCustomer,
} from "../../../../Redux/customer/customerSlice";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import CreateNewCustomerAddress from "./CreateNewCustomerAddress";

const CreateNewCustomerBasicInformation = ({ backToList, customerDetails }) => {
  const { basicInformation } = customerDetails;
  const dispatch = useDispatch();
  const { loading, customers, error } = useSelector((state) => state.customers);
  const [address, setNewAddress] = useState(false);

  const [formData, setFormData] = useState({
    basicInformation: {
      honorifics: "Mr",
      firstName: "",
      lastName: "",
      companyName: "",
      emailId: "",
      Mobile: "",
      landLine: "",
      website: "",
      gst: "",
    },
  });

  useEffect(() => {
    if (basicInformation) {
      setFormData({
        basicInformation: basicInformation || {
          honorifics: "Mr",
          firstName: "",
          lastName: "",
          companyName: "",
          emailId: "",
          Mobile: "",
          landLine: "",
          website: "",
          gst: "",
        },
      });
    }
  }, [basicInformation]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (customerDetails?._id) {
      dispatch(
        updateOrCreateCustomer({ id: customerDetails._id, data: formData })
      )
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
          resetForm();
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
        });
    } else {
      dispatch(createNewCustomer(formData))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
          setNewAddress(!address);
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
        });
    }
  };

  const resetForm = () => {
    setFormData({
      basicInformation: {
        honorifics: "Mr",
        firstName: "",
        lastName: "",
        companyName: "",
        emailId: "",
        Mobile: "",
        landLine: "",
        website: "",
        gst: "",
      },
    });
  };

  return (
    <div>
      {loading && <Loader />}
      {error &&
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })}

      {address ? (
        <CreateNewCustomerAddress customers={customers} />
      ) : (
        <div className="new-vendor-info">
          <div className="col-md-8 mb-5">
            <Form.Group className="new-vendor-field">
              <Form.Label className="col-md-3">Name</Form.Label>
              <div className="col-md-1 col-sm-12">
                <FormControl sx={{ minWidth: 60 }}>
                  <Select
                    className="package-filter"
                    displayEmpty
                    name="honorifics"
                    value={formData.basicInformation.honorifics}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "40px" }}
                  >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <InputGroup className="customer-name">
                <Form.Control
                  name="firstName"
                  placeholder="First name"
                  value={formData.basicInformation.firstName}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="customer-name">
                <Form.Control
                  name="lastName"
                  placeholder="Last name"
                  value={formData.basicInformation.lastName}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="col-md-8 mb-5">
            <Form.Group className="new-vendor-field">
              <Form.Label className="col-md-3">Company name</Form.Label>
              <InputGroup>
                <Form.Control
                  name="companyName"
                  value={formData.basicInformation.companyName}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="col-md-8 mb-5">
            <Form.Group className="new-vendor-field">
              <Form.Label className="col-md-3">Email id</Form.Label>
              <InputGroup>
                <Form.Control
                  name="emailId"
                  value={formData.basicInformation.emailId}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="col-md-8 mb-5">
            <Form.Group className="new-vendor-field">
              <Form.Label className="col-md-3">Website</Form.Label>
              <InputGroup>
                <Form.Control
                  name="website"
                  value={formData.basicInformation.website}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="col-md-8 mb-5">
            <Form.Group className="new-vendor-field">
              <Form.Label className="col-md-3">Mobile no</Form.Label>
              <InputGroup>
                <Form.Control
                  name="Mobile"
                  value={formData.basicInformation.Mobile}
                  onChange={handleChange}
                />
              </InputGroup>
              <Form.Label className="landline-field me-4">Landline</Form.Label>
              <InputGroup className="customer-name">
                <Form.Control
                  name="landLine"
                  value={formData.basicInformation.landLine}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
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
              <button
                className="btn btn-danger flex-grow-1"
                onClick={backToList}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewCustomerBasicInformation;
