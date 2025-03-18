import React, { useEffect, useMemo, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { Menu, MenuItem, Checkbox } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Helper/Loader";
import {
  addJobRoles,
  deleteJobRoles,
  editJobRoles,
  getJobRoles,
} from "../../../Redux/employee/employeeJobRoles";
import { toast, ToastContainer } from "react-toastify";

const EmployeeDeptJobModal = ({
  jobTitle,
  department,
  handleChange,
  toEditData,
}) => {
  const [openAddNewDepartmentDialog, setOpenAddNewDepartmentDialog] =
    useState(false);
  const [openAddNewJobDialog, setOpenAddNewJobDialog] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [departmentName, setDepartmentName] = useState([]);
  const [jobName, setJobName] = useState([]);
  const [newDepartments, setNewDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { loading, empData } = useSelector((state) => state.empJobRoles);
  const [departmentData, setDepartmentData] = useState();
  const [job, setJob] = useState();
  const [editingJobTitle, setEditingJobTitle] = useState(null);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [selectedJobOption, setSelectedJobOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRenameClick = (jobTitle) => {
    setEditingJobTitle(jobTitle);
    setNewJobTitle(jobTitle); // Set input value to existing title
  };

  const handleDepartmentRenameClick = (department) => {
    setEditingDepartment(department);
    setNewDepartmentName(department);
  };

  const handleSaveRename = async () => {
    if (editingJobTitle && newJobTitle.trim() !== "") {
      const payload = {
        jobTitles: {
          [editingJobTitle]: newJobTitle, // Old title as key, new title as value
        },
      };
      dispatch(editJobRoles(payload))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
          setJob(job.map((j) => (j === editingJobTitle ? newJobTitle : j)));
          setEditingJobTitle(null); // Exit edit mode
          setAnchorEl(null);
        })
        .catch((error) => toast.error(error));
    }
  };

  const handleSaveDepartmentRename = () => {
    if (editingDepartment && newDepartmentName.trim() !== "") {
      const payload = {
        department: {
          [editingDepartment]: newDepartmentName, // Old department as key, new name as value
        },
      };
      dispatch(editJobRoles(payload))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
          setDepartmentData(
            departmentData.map((dept) =>
              dept === editingDepartment ? newDepartmentName : dept
            )
          );
          setEditingDepartment(null); // Exit edit mode
          setAnchorEl(null);
        });
    }
  };

  const handleSaveDepartment = () => {
    const payload = {
      department: [departmentName],
    };
    dispatch(addJobRoles(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        dispatch(getJobRoles());
        setDepartmentName("");
      })
      .catch((error) => toast.error(error));
  };

  const handleSaveJob = () => {
    const payload = {
      jobTitles: [jobName],
    };
    dispatch(addJobRoles(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        dispatch(getJobRoles());
        setJobName("");
      })
      .catch((error) => toast.error(error));
  };

  const handleSelectJob = () => {
    if (selectedJob.length === job.length) {
      setSelectedJob([]);
    } else {
      setSelectedJob([...job]);
    }
  };

  const handleSelectDepartment = () => {
    if (selectedDepartments.length === departmentData.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments([...departmentData]);
    }
  };

  const handleCheckboxChange = (department) => {
    setSelectedDepartments((prev) => {
      const updatedDepartments = prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department];

      return updatedDepartments;
    });
  };

  const handleCheckboxChangeForJobTitle = (dept) => {
    setSelectedJob((prev) => {
      const updatedJobTitles = prev.includes(dept)
        ? prev.filter((d) => d !== dept)
        : [...prev, dept];

      return updatedJobTitles;
    });
  };

  const departmentOptions = useMemo(() => {
    if (!empData || empData.length === 0) return [];
  
    return empData[0]?.department.map((dept) => ({
      label: dept,
      value: dept.trim(), // Trim spaces to match toEditData.department
    })).concat({
      value: "manage",
      label: "Manage Department",
      icon: <SettingsIcon style={{ color: "blue", marginRight: 8 }} />,
    });
  }, [empData]);

  // Memoize jobOptions to prevent unnecessary re-renders
  const jobOptions = useMemo(() => {
    if (!empData || empData.length === 0) return [];
    
    return empData[0]?.jobTitles.map((job) => ({
      label: job,
      value: job.trim(), // Trim spaces to match toEditData.jobTitle
    })).concat({
      value: "manage",
      label: "Manage Job Title",
      icon: <SettingsIcon style={{ color: "blue", marginRight: 8 }} />,
    });
  }, [empData]);

  const handleDepartmentChange = (selected) => {
    if (selected?.value === "manage") {
      setOpenAddNewDepartmentDialog(true);
      setSelectedOption(null);
    } else {
      setSelectedOption(selected);
      handleChange({ target: { name: "department", value: selected.value } });
    }
  };

  const handleDepartmentDelete = () => {
    const payload = {
      department: selectedDepartments,
    };
    dispatch(deleteJobRoles(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setAnchorEl(null);
        dispatch(getJobRoles());
      })
      .catch((error) => {
        toast.error(error);
        setAnchorEl(null);
      });
  };

  const handleJobDelete = () => {
    const payload = {
      jobTitles: selectedJob,
    };
    dispatch(deleteJobRoles(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setAnchorEl(null);
        dispatch(getJobRoles());
      })
      .catch((error) => {
        toast.error(error);
        setAnchorEl(null);
      });
  };

  const handleJobChange = (selected) => {
    if (selected?.value === "manage") {
      setOpenAddNewJobDialog(true);
      setSelectedJobOption(null);
    } else {
      setSelectedJobOption(selected);
      handleChange({ target: { name: "jobTitle", value: selected.value } }); // Update parent state
    }
  };

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {data.icon && data.icon}
        {data.label}
      </div>
    );
  };

  const customSingleValue = ({ data }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {data.icon && data.icon}
      {data.label}
    </div>
  );

  useEffect(() => {
    dispatch(getJobRoles());
  }, [dispatch]);

  useEffect(() => {
    if (jobTitle) {
      const matchedJob = jobOptions.find((job) => job.value === jobTitle);
      setSelectedJobOption(matchedJob || null);
    }
  }, [jobTitle, jobOptions]);

  useEffect(() => {
    if (department) {
      const matchedDept = departmentOptions.find(
        (dept) => dept.value === department
      );
      setSelectedDepartments(matchedDept || null);
    }
  }, [department, departmentOptions]);

  useEffect(() => {
    setDepartmentData(empData?.[0]?.department ?? []);
    setJob(empData?.[0]?.jobTitles ?? []);
  }, [empData]);

  useEffect(() => {
    if (toEditData && jobOptions.length > 0) {
      const selectedJob = jobOptions.find(
        (option) => option.value.trim().toLowerCase() === toEditData.jobTitle.trim().toLowerCase()
      );
      setSelectedJobOption(selectedJob || null);
    }
  }, [jobOptions, toEditData]);
  
  useEffect(() => {
    if (toEditData && departmentOptions.length > 0) {
      const selectedDept = departmentOptions.find(
        (option) => option.value.trim().toLowerCase() === toEditData.department.trim().toLowerCase()
      );
      setSelectedOption(selectedDept || null);
    }
  }, [departmentOptions, toEditData]);

  return (
    <div className="col-md-12 mb-5">
      {loading && <Loader />}
      <Form.Group className="new-employee-field">
        <Form.Label className="col-md-2">Job title</Form.Label>
        <div className="col-md-4 form-group inventory-custom-dropdown">
          <Select
            value={selectedJobOption}
            onChange={handleJobChange}
            options={jobOptions}
            isSearchable
            placeholder="Select JobTitle"
            className="me-4 department-dropdown"
            classNamePrefix="select"
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
          />
          <Dialog
            open={openAddNewJobDialog}
            onClose={() => setOpenAddNewJobDialog(false)}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-paper": {
                width: "600px",
                maxWidth: "80vw",
              },
            }}
          >
            <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
              <h2>Add New Job title</h2>
            </DialogTitle>
            <DialogContent>
              <div className="col-md-8 mt-3">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-3">Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="jobName"
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-between gap-3 mt-4">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{
                    color: "white",
                    backgroundColor: "#1F3F7F",
                  }}
                  onClick={handleSaveJob}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={() => setOpenAddNewJobDialog(false)}
                >
                  Cancel
                </button>
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-3 mb-3">
                <Form.Group className="col-md-6 new-employee-field">
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="departmentSearch"
                      placeholder="Search Job title"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                {job?.length > 0 && (
                  <div className="d-flex align-items-center gap-3">
                    <div
                      onClick={handleSelectJob}
                      className="dept-select-all-btn"
                    >
                      {job?.length > 0 &&
                        (selectedDepartments?.length === job?.length
                          ? "Unselect all"
                          : "Select all")}
                    </div>
                    <div
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      className="dept-select-all-btn"
                    >
                      More action
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        onClick={() => handleRenameClick(selectedJob[0])}
                      >
                        Rename
                      </MenuItem>
                      <MenuItem onClick={handleJobDelete}>Delete</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="mt-3 mb-3">
                {job?.length > 0 ? (
                  job
                    .filter((dept) =>
                      dept.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((dept, index, array) => (
                      <div key={index} className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <Checkbox
                            checked={selectedJob.includes(dept)}
                            onChange={() =>
                              handleCheckboxChangeForJobTitle(dept)
                            }
                          />
                          {editingJobTitle === dept ? (
                            <>
                              <input
                                type="text"
                                value={newJobTitle}
                                onChange={(e) => setNewJobTitle(e.target.value)}
                                className="form-control"
                              />
                              <button
                                className="btn btn-primary ms-2"
                                onClick={handleSaveRename}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <span>{dept}</span>
                          )}
                        </div>
                        {index !== array.length - 1 && (
                          <hr className="mt-1 mb-1" />
                        )}
                      </div>
                    ))
                ) : (
                  <p>No Job title found</p>
                )}
              </div>
              ;
            </DialogContent>
          </Dialog>
        </div>
        <Form.Label className="col-md-2 dept-left">Department</Form.Label>
        <div className="col-md-4 form-group inventory-custom-dropdown">
          <Select
            className="me-4 department-dropdown"
            classNamePrefix="select"
            value={selectedOption}
            onChange={handleDepartmentChange}
            options={departmentOptions}
            isSearchable
            placeholder="Select Department"
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
          />
          <Dialog
            open={openAddNewDepartmentDialog}
            onClose={() => setOpenAddNewDepartmentDialog(false)}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-paper": {
                width: "600px",
                maxWidth: "80vw",
              },
            }}
          >
            <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
              <h2>Add New Department</h2>
            </DialogTitle>
            <DialogContent>
              <div className="col-md-8 mt-3">
                <Form.Group className="new-employee-field">
                  <Form.Label className="col-md-3">Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="departmentName"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-between gap-3 mt-4">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{
                    color: "white",
                    backgroundColor: "#1F3F7F",
                  }}
                  onClick={handleSaveDepartment}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={() => setOpenAddNewDepartmentDialog(false)}
                >
                  Cancel
                </button>
              </div>
              <hr />
              <div className="d-md-flex justify-content-between mt-3 mb-3">
                <Form.Group className="col-md-6 new-employee-field">
                  <InputGroup>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      name="departmentSearch"
                      placeholder="Search department"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                {departmentData?.length > 0 && (
                  <div className="d-flex align-items-center gap-3">
                    <div
                      onClick={handleSelectDepartment}
                      className="dept-select-all-btn"
                    >
                      {departmentData?.length > 0 &&
                        (selectedDepartments?.length === departmentData?.length
                          ? "Unselect all"
                          : "Select all")}
                    </div>
                    <div
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      className="dept-select-all-btn"
                    >
                      More action
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        onClick={() =>
                          handleDepartmentRenameClick(selectedDepartments[0])
                        }
                      >
                        Rename
                      </MenuItem>
                      <MenuItem onClick={handleDepartmentDelete}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="mt-3 mb-3">
                {departmentData?.length > 0 ? (
                  departmentData
                    .filter((dept) =>
                      dept.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((dept, index, array) => (
                      <div key={index} className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <Checkbox
                            checked={selectedDepartments?.includes(dept)}
                            onChange={() => handleCheckboxChange(dept)}
                          />
                          {editingDepartment === dept ? (
                            <>
                              <input
                                type="text"
                                value={newDepartmentName}
                                onChange={(e) =>
                                  setNewDepartmentName(e.target.value)
                                }
                                className="form-control"
                              />
                              <button
                                className="btn btn-primary ms-2"
                                onClick={handleSaveDepartmentRename}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <span>{dept}</span>
                          )}
                        </div>
                        {index !== array.length - 1 && (
                          <hr className="mt-1 mb-1" />
                        )}
                      </div>
                    ))
                ) : (
                  <p>No Department found</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Form.Group>
      <ToastContainer />
    </div>
  );
};

export default EmployeeDeptJobModal;
