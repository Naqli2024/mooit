import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { createNewVendor } from "../../../../Redux/vendor/vendorSlice";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";

const CreateNewBasicInformation = ({ backToList }) => {
  const [formData, setFormData] = useState({
    basicInformation: {
      honorifics: "mr",
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
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendor);

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
    dispatch(createNewVendor(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => backToList(), 2000);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
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
      <div className="new-vendor-info">
        <div className="col-md-8 mb-5">
          <Form.Group className="new-vendor-field">
            <Form.Label className="col-md-3">Name</Form.Label>
            <div className="">
              <FormControl sx={{ minWidth: 60 }}>
                <Select
                  className="package-filter"
                  displayEmpty
                  name="honorifics"
                  value={formData.basicInformation.honorifics}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    height: "40px",
                  }}
                >
                  <MenuItem value="mr">Mr</MenuItem>
                  <MenuItem value="mrs">Mrs</MenuItem>
                </Select>
              </FormControl>
            </div>
            <InputGroup className="">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="firstName"
                placeholder="First name"
                value={formData.basicInformation.firstName}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
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
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
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
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="emailId"
                value={formData.basicInformation.emailId}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="col-md-8 mb-5">
          <Form.Group className="new-vendor-field">
            <Form.Label className="col-md-3">Mobile</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="Mobile"
                value={formData.basicInformation.Mobile}
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Label className="col-md-3 landline-field">
              Landline
            </Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="landLine"
                value={formData.basicInformation.landLine}
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
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="website"
                value={formData.basicInformation.website}
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Label className="col-md-3 landline-field">GST</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="gst"
                value={formData.basicInformation.gst}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
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
          <button className="btn btn-danger flex-grow-1" onClick={backToList}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewBasicInformation;
