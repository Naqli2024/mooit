import React, { useState, lazy, Suspense, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import { newFloorManagementSchema } from "../../../../Helper/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Country, State, City } from "country-state-city";
import Loader from "../../../../Helper/Loader";
import { useDispatch } from "react-redux";
import { createWarehouse } from "../../../../Redux/floorManagement/warehouseSlice";
import { toast, ToastContainer } from "react-toastify";
const FloorManagementOverView = lazy(() => import("./FloorManagementOverView"));

const NewFloorManagement = ({ backToList, setOpenNewFloorManagement }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(newFloorManagementSchema) });
  const [isFinishedProductChecked, setIsFinishedProductChecked] =
    useState(false);
  const [isSparePartsChecked, setIsSparePartsChecked] = useState(false);
  const [isRawMaterialsChecked, setIsRawMaterialsChecked] = useState(false);
  const [openFloorOverview, setOpenFloorOverview] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [dimensions, setDimensions] = useState({
    finishedProduct: { width: "", height: "" },
    spareParts: { width: "", height: "" },
    rawMaterials: { width: "", height: "" },
    totalWarehouseSize: { width: "", height: "" },
  });

  const handleDimensionChange = (e, field, type) => {
    const value = e.target.value;
    //attempt to parse the string into a number.
    const numericValue = parseInt(value, 10);
    setDimensions((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: isNaN(numericValue) ? "" : numericValue,
      },
    }));
  };

  const handleBackToList = () => {
    setOpenNewFloorManagement(false);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      warehouseName: event.target.warehouseName.value,
      country: event.target.country.value,
      state: event.target.state.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
      address: event.target.address.value,
      status: event.target.status.value,
      warehouseManager: event.target.warehouseManager.value,
      spaceConfiguration: {
        finishedProduct: {
          width: parseInt(dimensions.finishedProduct.width) || 0,
          height: parseInt(dimensions.finishedProduct.height) || 0,
        },
        spareParts: {
          width: parseInt(dimensions.spareParts.width) || 0,
          height: parseInt(dimensions.spareParts.height) || 0,
        },
        rawMaterials: {
          width: parseInt(dimensions.rawMaterials.width) || 0,
          height: parseInt(dimensions.rawMaterials.height) || 0,
        },
      },
      sizeCustomization: {
        totalWarehouseSize: {
          width: parseInt(dimensions.totalWarehouseSize.width) || 0,
          height: parseInt(dimensions.totalWarehouseSize.height) || 0,
        },
      },
    };

    setLoading(true)
    dispatch(createWarehouse(data))
    .unwrap()
    .then((response) => {
      setLoading(false)
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        closeButton: false
      })
      setTimeout(() => setOpenFloorOverview(true), 1000)
    })
    .catch((error) => toast.error(error))
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      {openFloorOverview ? (
        <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center">
            <Loader />
            <p className="lazy-loading-text mt-2">
              Loading Floor Management Overview...
            </p>
          </div>
        }
      >
        <FloorManagementOverView
          backToList={() => setOpenFloorOverview(false)}
        />
      </Suspense>
      ) : (
        <div className="purchase-list">
          <h2>New Floor Management</h2>
          <button onClick={handleBackToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleFormSubmit}>
            <div className="new-floor-form">
              <div className="new-floor-left-content">
                <div className="col-md-8 mb-4">
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="custom-label mb-0">
                        Warehouse Name
                      </Form.Label>
                      {errors.warehouseName && (
                        <ErrorOutlineOutlinedIcon className="text-danger" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Control
                        className="custom-textfield"
                        {...register("warehouseName")}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="custom-label mb-0">
                        Choose Country
                      </Form.Label>
                      {errors.country && (
                        <ErrorOutlineOutlinedIcon className="text-danger" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Select
                        className="custom-textfield"
                        {...register("country")}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="custom-label mb-0">
                        Choose State
                      </Form.Label>
                      {errors.state && (
                        <ErrorOutlineOutlinedIcon className="text-danger" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Select
                        className="custom-textfield"
                        {...register("state")}
                      >
                        <option value="">Select a state</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="custom-label mb-0">
                        Choose City
                      </Form.Label>
                      {errors.city && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Select
                        className="custom-textfield"
                        {...register("city")}
                      >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-0">
                        Postal Code
                      </Form.Label>
                      {errors.postalCode && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Control
                        className="custom-textfield"
                        {...register("postalCode")}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-0">
                        Address
                      </Form.Label>
                      {errors.address && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Control
                        className="custom-textfield"
                        {...register("address")}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-0">
                        Status
                      </Form.Label>
                      {errors.status && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Select
                        className="custom-textfield"
                        {...register("status")}
                      >
                        <option value="">Select a status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Under Maintenance">
                          Under Maintenance
                        </option>
                        <option value="Closed">Closed</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-8 mt-4">
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-0">
                        Warehouse Manager
                      </Form.Label>
                      {errors.warehouseManager && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                    <InputGroup className="mt-2">
                      <Form.Control
                        className="custom-textfield"
                        {...register("warehouseManager")}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>
              <div className="new-floor-divider"></div>
              <div className="new-floor-right-content">
                <p className="fw-bold">Space Configuration</p>
                <p className="mt-2">Select section</p>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <p>
                    <input
                      type="checkBox"
                      onChange={() =>
                        setIsFinishedProductChecked(!isFinishedProductChecked)
                      }
                    ></input>
                  </p>
                  <p>Finished product</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <p>
                    <input
                      type="checkBox"
                      onChange={() =>
                        setIsSparePartsChecked(!isSparePartsChecked)
                      }
                    ></input>
                  </p>
                  <p>Spare parts</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <p>
                    <input
                      type="checkBox"
                      onChange={() =>
                        setIsRawMaterialsChecked(!isRawMaterialsChecked)
                      }
                    ></input>
                  </p>
                  <p>Raw materials</p>
                </div>
                <p className="fw-bold mt-5">Size Customization</p>
                <div className="col-md-8 col-12 mb-4">
                  <Form.Group className="d-md-flex align-items-center">
                    <Form.Label className="custom-label col-md-7">
                      Total warehouse size (W x H)
                    </Form.Label>
                    <InputGroup className="mt-2 mx-2">
                      <Form.Control
                        className="custom-textfield"
                        onChange={(e) =>
                          handleDimensionChange(
                            e,
                            "totalWarehouseSize",
                            "width"
                          )
                        }
                        placeholder="Width"
                      />
                    </InputGroup>
                    <InputGroup className="mt-2">
                      <Form.Control
                        className="custom-textfield"
                        onChange={(e) =>
                          handleDimensionChange(
                            e,
                            "totalWarehouseSize",
                            "height"
                          )
                        }
                        placeholder="Height"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                {isFinishedProductChecked && (
                  <div className="col-md-8 col-12 mb-4">
                    <Form.Group className="d-md-flex align-items-center">
                      <Form.Label className="custom-label col-md-7">
                        Finished product floor
                      </Form.Label>
                      <InputGroup className="mt-2 mx-2">
                        <Form.Control
                          className="custom-textfield"
                          placeholder="Width"
                          onChange={(e) =>
                            handleDimensionChange(e, "finishedProduct", "width")
                          }
                        />
                      </InputGroup>
                      <InputGroup className="mt-2">
                        <Form.Control
                          className="custom-textfield"
                          placeholder="Height"
                          onChange={(e) =>
                            handleDimensionChange(
                              e,
                              "finishedProduct",
                              "height"
                            )
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                )}
                {isSparePartsChecked && (
                  <div className="col-md-8 col-12 mb-4">
                    <Form.Group className="d-md-flex align-items-center">
                      <Form.Label className="custom-label col-md-7">
                        Spare parts floor (W x Y)
                      </Form.Label>
                      <InputGroup className="mt-2 mx-2">
                        <Form.Control
                          className="custom-textfield"
                          onChange={(e) =>
                            handleDimensionChange(e, "spareParts", "width")
                          }
                          placeholder="Width"
                        />
                      </InputGroup>
                      <InputGroup className="mt-2">
                        <Form.Control
                          className="custom-textfield"
                          onChange={(e) =>
                            handleDimensionChange(e, "spareParts", "height")
                          }
                          placeholder="Height"
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                )}
                {isRawMaterialsChecked && (
                  <div className="col-md-8 col-12 mb-4">
                    <Form.Group className="d-md-flex align-items-center">
                      <Form.Label className="custom-label col-md-7">
                        Raw materials floor (W x H)
                      </Form.Label>
                      <InputGroup className="mt-2 mx-2">
                        <Form.Control
                          className="custom-textfield"
                          placeholder="Width"
                          onChange={(e) =>
                            handleDimensionChange(e, "rawMaterials", "width")
                          }
                        />
                      </InputGroup>
                      <InputGroup className="mt-2">
                        <Form.Control
                          className="custom-textfield"
                          placeholder="Height"
                          onChange={(e) =>
                            handleDimensionChange(e, "rawMaterials", "height")
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                )}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center m-5">
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
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewFloorManagement;
