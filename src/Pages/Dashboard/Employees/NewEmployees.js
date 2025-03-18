import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import EmployeeDetails from "./EmployeeDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { newEmployeeSchema } from "../../../Helper/validation";
import EmployeeDeptJobModal from "./EmployeeDeptJobModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  editEmployee,
  generateEmployeeId,
} from "../../../Redux/employee/employeeSlice";
import Loader from "../../../Helper/Loader";
import { toast, ToastContainer } from "react-toastify";
import Employees from "./Employees";

const NewEmployees = ({ backToList, toEditData, setToEditData }) => {
  const [openEmployeeDetails, setOpenEmployeeDetails] = useState(false);
  const [openNewEmployeeDetails, setOpenNewEmployeeDetails] = useState(true);
  const dispatch = useDispatch();
  const { loading, employeeId } = useSelector(
    (state) => state.generateEmployeeId
  );
  const [employee, setEmployee] = useState();
  const [showFileName, setShowFileName] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newEmployeeSchema) });

  const handleAddEmployee = () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "profile") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.profile instanceof File) {
      formDataToSend.append("profile", formData.profile);
    }

    const action = toEditData?.employeeId
      ? editEmployee({
          employeeId: toEditData.employeeId,
          payload: formDataToSend,
        })
      : createEmployee(formDataToSend);

    dispatch(action)
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });

        setTimeout(() => {
          setEmployee(response.data);
          setOpenEmployeeDetails(true);
        }, 2000);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong.");
      });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    dob: "",
    profile: null,
    jobTitle: "",
    department: "",
    typeOfHire: "",
    dateOfJoining: "",
    nationality: "",
    gender: "",
    accessTo: "",
    age: null,
    employeeId: employeeId || "",
  });

  useEffect(() => {
    if (toEditData) {
      setFormData((prev) => ({
        ...prev,
        ...toEditData,
        profile: toEditData?.profile?.fileName || "",
        employeeId: toEditData.employeeId || employeeId || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        employeeId: employeeId || "",
      }));
    }
  }, [toEditData, employeeId]);

  const onSubmit = () => {};

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      console.log("Selected file:", files[0]);
      setShowFileName(false)
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    dispatch(generateEmployeeId());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {!openNewEmployeeDetails ? (
        <Employees />
      ) : openEmployeeDetails ? (
        <EmployeeDetails
          backToList={() => {
            setOpenEmployeeDetails(false);
          }}
          employee={employee}
          setOpenNewEmployeeDetails={setOpenNewEmployeeDetails}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Employee</h2>
          <button
            onClick={() => {
              setToEditData(null);
              backToList();
            }}
            className="goBack-btn"
          >
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="new-employee-form">
            <div className="p-5">
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Name</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="firstName"
                      placeholder="First name"
                      {...register("firstName")}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="lastName"
                      {...register("lastName")}
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Email id</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="emailId"
                      {...register("emailId")}
                      value={formData.emailId}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Address</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="address"
                      {...register("address")}
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">City</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="city"
                      {...register("city")}
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">State</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="state"
                      {...register("state")}
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Zip code</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="zipCode"
                      {...register("zipCode")}
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">Mobile no</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="mobileNo"
                      {...register("mobileNo")}
                      value={formData.mobileNo}
                      onChange={handleChange}
                    />
                    {errors.mobileNo && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Password</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="password"
                      type="password"
                      {...register("password")}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">DOB</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="date"
                      type="date"
                      {...register("dob")}
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">Profile Picture</Form.Label>
                  <div className="upload-profile">
                    <InputGroup>
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className="custom-textfield"
                        name="profile"
                        type="file"
                        {...register("profile")}
                        accept="image/*"
                        onChange={handleChange}
                      />
                      {errors.profile && (
                        <InputGroup.Text>
                          {<ErrorOutlineOutlinedIcon className="text-danger" />}
                        </InputGroup.Text>
                      )}
                    </InputGroup>
                    {/* Display the stored file name separately */}
                    {showFileName && toEditData?.profile?.fileName && (
                      <p className="mt-2 text-muted">
                        Current File: {toEditData?.profile.fileName}
                      </p>
                    )}
                    {/* Show selected file name when a new file is chosen */}
                    {showFileName && formData.profile instanceof File && (
                      <p className="mt-2 text-muted">
                        Selected File: {formData.profile.name}
                      </p>
                    )}
                  </div>
                </Form.Group>
              </div>
              <EmployeeDeptJobModal
                jobTitle={formData.jobTitle}
                department={formData.department}
                toEditData={toEditData}
                handleChange={handleChange}
              />
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Type of hire</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="typeOfHire"
                      {...register("typeOfHire")}
                      value={formData.typeOfHire}
                      onChange={handleChange}
                    />
                    {errors.typeOfHire && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">Date of joining</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="dateOfJoining"
                      type="date"
                      {...register("dateOfJoining")}
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                    />
                    {errors.dateOfJoining && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Nationality</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="nationality"
                      {...register("nationality")}
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                    {errors.nationality && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <Form.Label className="col-md-2">Gender</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="gender"
                      {...register("gender")}
                      value={formData.gender}
                      onChange={handleChange}
                    />
                    {errors.gender && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-12 mb-5">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-2">Access to</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="accessTo"
                      {...register("accessTo")}
                      value={formData.accessTo}
                      onChange={handleChange}
                    />
                    {errors.accessTo && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {/* <div className="col-md-6 ms-md-4">
                    <div className="addAccess cursor-pointer">+</div>
                    <div>Add Access</div>
                  </div> */}
                  <Form.Label className="col-md-2">Age</Form.Label>
                  <InputGroup className="me-5">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="age"
                      {...register("age")}
                      value={formData.age}
                      onChange={handleChange}
                    />
                    {errors.nationality && (
                      <InputGroup.Text>
                        {<ErrorOutlineOutlinedIcon className="text-danger" />}
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="container-fluid">
                <div className="row justify-content-center mt-5">
                  <div className="col-12 col-md-3 d-flex justify-content-between gap-3">
                    <button
                      type="submit"
                      className="btn flex-grow-1"
                      style={{ color: "white", backgroundColor: "#1F3F7F" }}
                      onClick={handleAddEmployee}
                    >
                      Create login
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
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewEmployees;
