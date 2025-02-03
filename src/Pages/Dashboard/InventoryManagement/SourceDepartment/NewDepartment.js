import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSourceDepartment } from "../../../../Redux/sourceDepartment/sourceDepartmentSlice";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";

const NewDepartment = ({ backToList }) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    type: "",
    location: "",
    contactPerson: "",
    status: "",
  });
  const dispatch = useDispatch();
  const { loading: isLoading } = useSelector((state) => state.sourceDepartment);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createSourceDepartment(formData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setFormData({
          departmentName: "",
          departmentCode: "",
          type: "",
          location: "",
          contactPerson: "",
          status: "",
        });
        setTimeout(() => {
          backToList();
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  return (
    <div className="purchase-list">
      {isLoading && <Loader />}
      <h2>New department</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="new-package-form">
        <div className="new-package-name-sales mb-5">
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">
                Department name
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  value={formData.departmentName}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentName: e.target.value })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">
                Department code/id
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  value={formData.departmentCode}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentCode: e.target.value })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">Type</Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="new-package-name-sales">
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">Location</Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">
                Contact person
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-3 mt-3">
            <Form.Group>
              <Form.Label className="custom-label fw-bold">Status</Form.Label>
              <InputGroup className="mt-1">
                <Form.Select
                  aria-label="Select Status"
                  className="custom-textfield"
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="notActive">Inactive</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center button-top-padding">
            <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn flex-grow-1"
                style={{ color: "white", backgroundColor: "#1F3F7F" }}
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
      </div>
    </div>
  );
};

export default NewDepartment;
