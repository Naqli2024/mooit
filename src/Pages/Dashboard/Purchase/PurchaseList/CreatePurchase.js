import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { createPurchase } from "../../../../Redux/features/purchaseSlice";
import InputAdornment from "@mui/material/InputAdornment";
import {
  operationType,
  shelf,
  storageCondition,
  wareHouses,
} from "../../../../Data/ProductData";
import MenuItem from "@mui/material/MenuItem";
import EditModal from "./EditModal";
import dayjs from "dayjs";
import { getAllVendors } from "../../../../Redux/vendor/vendorSlice";
import { generateSkuForProduct } from "../../../../Redux/features/generateSkuForProduct";
import { generateHsnCode } from "../../../../Redux/features/generateHsnCode";
import { toast, ToastContainer } from "react-toastify";
import { getPurchaseDetails } from "../../../../Redux/features/getPurchaseDetailsSlice";
import { getAllCategories } from "../../../../Redux/category/categorySlice";
import PrintBarcodeDialog from "./PrintBarcodeDialog";

const CreatePurchase = ({ backToList }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendor);
  const { sku } = useSelector((state) => state.generateSku);
  const { hsn } = useSelector((state) => state.generateHsnCode);
  const { category } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openBarcodeDialog, setOpenBarcodeDialog] = useState(false);

  const [purchaseData, setPurchaseData] = useState({
    productName: "",
    vendorName: "",
    partNumber: "",
    hsnCode: "",
    sku: "",
    quantity: "",
    manufacturer: "",
    manufacturedDate: "",
    MRP: "",
    purchaseRate: "",
    unitPrice: "",
    GST: "",
    advanceAmount: "",
    brandName: "",
    category: "",
    subCategory: "",
    wareHouse: "",
    rack: "",
    shelf: "",
    shelfSpace: "",
    operationType: "",
    storageCondition: "",
    storageCost: "",
    storageDate: null,
    expiryDate: null,
    invoiceDate: null,
    invoiceNo: "",
    invoiceValue: "",
    extraFields: {},
  });
  const [dynamicFields, setDynamicFields] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of extraFields (using dynamicFields array of strings)
    if (dynamicFields.includes(name)) {
      // Update extraFields in the state
      setPurchaseData((prevData) => ({
        ...prevData,
        extraFields: {
          ...(prevData.extraFields || {}),
          [name]: value, // Update the specific dynamic field inside extraFields
        },
      }));
    } else if (
      ["expiryDate", "storageDate", "invoiceDate"].includes(name) &&
      dayjs.isDayjs(value)
    ) {
      // Handle date fields
      const formattedDate = value.format("YYYY-MM-DD");
      setPurchaseData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      // Handle other fields outside of extraFields
      setPurchaseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...purchaseData,
      extraFields: purchaseData.extraFields,
    };
    dispatch(createPurchase(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          backToList();
          dispatch(getPurchaseDetails());
        }, 2000);
      })
      .catch((error) => toast.error(error));
    setPurchaseData({
      productName: "",
      vendorName: "",
      partNumber: "",
      hsnCode: "",
      sku: "",
      manufacturer: "",
      manufacturedDate: "",
      quantity: "",
      MRP: "",
      purchaseRate: "",
      unitPrice: "",
      GST: "",
      advanceAmount: "",
      brandName: "",
      category: "",
      wareHouse: "",
      rack: "",
      shelf: "",
      shelfSpace: "",
      operationType: "",
      storageCondition: "",
      storageCost: "",
      storageDate: null,
      expiryDate: null,
      invoiceDate: null,
      invoiceNo: "",
      invoiceValue: "",
      extraFields: {},
    });
  };

  const handleEditField = (updatedData) => {
    setPurchaseData((prevData) => ({
      ...prevData,
      extraFields: updatedData,
    }));
  };

  const handleAddField = (newField) => {
    setDynamicFields((prevFields) => [...prevFields, newField]);
    setPurchaseData(() => ({
      extraFields: { [newField]: "" },
    }));
  };

  const handleDeleteField = (field) => {
    const updatedFields = dynamicFields.filter((f) => f !== field);
    const updatedData = { ...purchaseData };
    delete updatedData[field];
    setDynamicFields(updatedFields);
    setPurchaseData(updatedData);
  };

  useEffect(() => {
    dispatch(getAllVendors());

    if (!sku) {
      dispatch(generateSkuForProduct());
    }

    if (!hsn) {
      dispatch(generateHsnCode());
    }
  }, [dispatch, hsn, sku]);

  useEffect(() => {
    if (sku?.data || hsn?.data) {
      setPurchaseData((prev) => ({
        ...prev,
        sku: sku?.data || prev.sku,
        hsnCode: hsn?.data || prev.hsnCode,
      }));
    }
  }, [sku?.data, hsn?.data]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category?.length) {
      setCategories(
        category.map((data) => ({
          label: data.categoryName,
          value: data.categoryName,
        }))
      );
    }
  }, [category]);

  useEffect(() => {
    if (purchaseData.category) {
      const selectedCategory = category?.find(
        (c) => c.categoryName === purchaseData.category
      );
      setSubCategories(
        selectedCategory?.subCategories?.map((sub) => ({
          label: sub.name,
          value: sub.name,
        })) || []
      );
    }
  }, [purchaseData.category, category]);

  return (
    <>
      <h2>Purchase</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="create-purchase">
        <Form onSubmit={handleSubmit}>
          <div className="row create-purchase-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Product Name</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    name="productName"
                    value={purchaseData.productName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Vendor Name</Form.Label>
                <Form.Select
                  className="mt-2 custom-textfield"
                  name="vendorName"
                  value={purchaseData.vendorName}
                  onChange={handleInputChange}
                >
                  <option value="">Select Vendor</option> {/* Default option */}
                  {Array.isArray(vendors) && vendors.length > 0 ? (
                    vendors &&
                    vendors.map((vendor, index) => (
                      <option
                        key={vendor._id || index}
                        value={`${vendor.basicInformation.firstName} ${vendor.basicInformation.lastName}`}
                      >
                        {vendor.basicInformation.firstName}{" "}
                        {vendor.basicInformation.lastName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No vendors available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </div>
            <hr className="mt-5"></hr>
          </div>
          <div className="create-purchase-heading">
            <div className="classification-text">Classification</div>
            <div onClick={() => setOpen(true)} className="edit-text">
              Edit
            </div>
          </div>
          <Box
            component="form"
            sx={{ "& > :not(style)": { marginTop: 3 } }}
            noValidate
            // autoComplete="off"
          >
            <div className="row all-textfield-spacing">
              <TextField
                label="Part number"
                id="outlined-start-adornment"
                className="textfield-spacing"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
                name="partNumber"
                value={purchaseData.partNumber}
                onChange={handleInputChange}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="HSN code"
                name="hsnCode"
                value={purchaseData.hsnCode}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="SKU"
                name="sku"
                value={purchaseData.sku}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Quantity"
                name="quantity"
                value={purchaseData.quantity}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="row all-textfield-spacing">
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Manufacturer"
                name="manufacturer"
                value={purchaseData.manufacturer}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: "100%" }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Manufactured date"
                    name="manufacturedDate"
                    value={
                      purchaseData?.manufacturedDate
                        ? dayjs(purchaseData.manufacturedDate)
                        : null
                    }
                    onChange={(newValue) =>
                      handleInputChange({
                        target: { name: "manufacturedDate", value: newValue },
                      })
                    }
                  />
                </Box>
              </LocalizationProvider>
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="MRP"
                name="MRP"
                value={purchaseData.MRP}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Purchase rate"
                name="purchaseRate"
                value={purchaseData.purchaseRate}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="row all-textfield-spacing">
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Unit price"
                name="unitPrice"
                value={purchaseData.unitPrice}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="GST"
                name="GST"
                value={purchaseData.GST}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Advance amount"
                name="advanceAmount"
                value={purchaseData.advanceAmount}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Brand name"
                name="brandName"
                value={purchaseData.brandName}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="row all-textfield-spacing">
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-category"
                  select
                  label="Category"
                  className="textfield-spacing"
                  name="category"
                  value={purchaseData.category || ""}
                  onChange={handleInputChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-subCategory"
                  select
                  label="Sub Category"
                  className="textfield-spacing"
                  name="subCategory"
                  value={purchaseData.subCategory || ""}
                  onChange={handleInputChange}
                  disabled={!purchaseData.category}
                >
                  {subCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-warehouse"
                  select
                  label="Warehouse"
                  className="textfield-spacing"
                  name="wareHouse"
                  value={purchaseData.wareHouse || ""}
                  onChange={handleInputChange}
                >
                  {wareHouses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Rack"
                name="rack"
                value={purchaseData.rack}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="row all-textfield-spacing">
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-shelf"
                  select
                  label="Shelf"
                  defaultValue="select"
                  className="textfield-spacing"
                  name="shelf"
                  value={purchaseData.shelf}
                  onChange={handleInputChange}
                >
                  {shelf.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Shelf space"
                name="shelfSpace"
                value={purchaseData.shelfSpace}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-shelf"
                  select
                  label="Operation Type"
                  className="textfield-spacing"
                  name="operationType"
                  value={purchaseData.operationType || ""}
                  onChange={handleInputChange}
                >
                  {operationType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="textfield-spacing">
                <TextField
                  id="outlined-select-shelf"
                  select
                  label="Storage Condition"
                  className="textfield-spacing"
                  name="storageCondition"
                  value={purchaseData.storageCondition || ""}
                  onChange={handleInputChange}
                >
                  {storageCondition.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="row invoice-textfield-spacing">
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Storage cost"
                name="storageCost"
                value={purchaseData.storageCost}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <div className="textfield-spacing">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Storage date"
                      name="storageDate"
                      value={
                        purchaseData.storageDate
                          ? dayjs(purchaseData.storageDate)
                          : null
                      }
                      onChange={(newValue) =>
                        handleInputChange({
                          target: { name: "storageDate", value: newValue },
                        })
                      }
                    />
                  </Box>
                </LocalizationProvider>
              </div>
              <div className="textfield-spacing">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Expiry date"
                      name="expiryDate"
                      value={
                        purchaseData.expiryDate
                          ? dayjs(purchaseData.expiryDate)
                          : null
                      } // Use Day.js for value
                      onChange={(newValue) =>
                        handleInputChange({
                          target: { name: "expiryDate", value: newValue },
                        })
                      } // Pass Day.js object to the handler
                    />
                  </Box>
                </LocalizationProvider>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box className="Invoice-date-textfield" sx={{ width: "24%" }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Invoice date"
                    name="invoiceDate"
                    value={
                      purchaseData.invoiceDate
                        ? dayjs(purchaseData.invoiceDate)
                        : null
                    }
                    onChange={(newValue) =>
                      handleInputChange({
                        target: { name: "invoiceDate", value: newValue },
                      })
                    }
                  />
                </Box>
              </LocalizationProvider>
            </div>
            <div className="row invoice-textfield-spacing">
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Invoice no"
                name="invoiceNo"
                value={purchaseData.invoiceNo}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                className="textfield-spacing"
                id="outlined-start-adornment"
                label="Invoice value"
                name="invoiceValue"
                value={purchaseData.invoiceValue}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            {Array.from({ length: Math.ceil(dynamicFields.length / 4) }).map(
              (_, rowIndex) => (
                <div className="row all-textfield-spacing" key={rowIndex}>
                  {dynamicFields
                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                    .map((field, index) => (
                      <TextField
                        key={field} // Use field as key if unique; otherwise, use index
                        className="textfield-spacing"
                        id={`outlined-start-adornment-${rowIndex}-${index}`}
                        label={field}
                        name={field}
                        value={purchaseData.extraFields?.[field] || ""}
                        onChange={handleInputChange}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          },
                        }}
                      />
                    ))}
                </div>
              )
            )}
          </Box>
          <div
            className="print-barcode"
            onClick={() => setOpenBarcodeDialog(true)}
          >
            <span>
              <LocalPrintshopIcon />
            </span>
            Print Barcode
          </div>
          <PrintBarcodeDialog
            open={openBarcodeDialog}
            handleClose={() => setOpenBarcodeDialog(false)}
            purchaseData={purchaseData}
          />
          <div className="container mt-4">
            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn submit-btn">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
      {/* Edit Modal */}
      <EditModal
        open={open}
        handleClose={() => setOpen(false)}
        purchaseData={purchaseData}
        dynamicFields={dynamicFields}
        handleAddField={handleAddField}
        handleEditField={handleEditField}
        handleDeleteField={handleDeleteField}
      />
      <ToastContainer />
    </>
  );
};

export default CreatePurchase;
