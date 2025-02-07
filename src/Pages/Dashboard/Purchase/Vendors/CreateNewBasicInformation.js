import React, { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { createNewVendor, updateOrCreateVendor } from "../../../../Redux/vendor/vendorSlice";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import CreateNewAddress from "./CreateNewAddress";

const CreateNewBasicInformation = ({ backToList, vendorDetails }) => {
  console.log(vendorDetails)
  const { basicInformation } = vendorDetails;
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
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendor);
  const [address, setNewAddress] = useState(false);

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
    if (vendorDetails?._id) {
      dispatch(
        updateOrCreateVendor({
          id: vendorDetails?._id,
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
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
        });
    } else {
      dispatch(createNewVendor(formData))
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

  useEffect(() => {
    if (basicInformation) {
      setFormData({
        basicInformation: basicInformation || {
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
    }
  }, [basicInformation]);

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
        <CreateNewAddress vendors={vendors} />
      ) : (
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
              <InputGroup className="ms-3">
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
              <InputGroup className="ms-3">
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
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default CreateNewBasicInformation;
