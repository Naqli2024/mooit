import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseDetails } from "../../../../Redux/features/getPurchaseDetailsSlice";
import { findPurchaseByItemName } from "../../../../Redux/features/findPurchaseSlice";
import Select from "react-select";
import dayjs from "dayjs";
import { createInventory } from "../../../../Redux/inventory/createInventorySlice";
import { toast, ToastContainer } from "react-toastify";

const CreateNewItems = ({ backToList }) => {
  const [categoryOption, setCategoryOption] = useState(null);
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.getPurchaseDetails
  );
  const { product } = useSelector((state) => state.findPurchaseByItemName);
  const { inventory } = useSelector((state) => state.createInventoryReducer);
  const [formData, setFormData] = useState({
    salePrice: "",
    description: "",
    openingInventory: "",
    restockPoint: "",
  });

  const handleCategoryChange = (selectedOption) => {
    setCategoryOption(selectedOption);
    dispatch(findPurchaseByItemName({ itemName: selectedOption.value }));
  };

  const categoryOptions = [
    ...Array.from(new Set(data?.map((item) => item.productName || ""))),
  ].map((product) => ({
    label: product,
    value: product,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      salesInformation: {
        salePrice: formData.salePrice,
        description: formData.description,
      },
      inventoryTracking: {
        openingInventory: formData.openingInventory,
        restockPoint: formData.restockPoint,
      },
      ...product,
    };
    dispatch(createInventory(payload))
    .unwrap()
    .then((response) => {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 2000,
        closeButton: false
      });
      setTimeout(() => backToList(), 2000)
    })
    .catch((error) => toast.error(error))
  };

  useEffect(() => {
    dispatch(getPurchaseDetails());
  }, [dispatch]);

  return (
    <div>
      <div className="purchase-list">
        <h2>New Items</h2>
      </div>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="newItems-content">
        <form onSubmit={handleSubmit}>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Product Name</Form.Label>
                <Select
                  name="productName"
                  options={categoryOptions}
                  value={categoryOption}
                  onChange={handleCategoryChange}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  placeholder="Enter product name"
                  menuPortalTarget={document.body}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      fontSize: "14px",
                    }),
                  }}
                />
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Quantity</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="quantity"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.quantity || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">SKU</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="SKU"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.sku || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">HNS code</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="hsnCode"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.hsnCode || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Brand Name</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="brandName"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.brandName || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Category</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="category"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.category || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="fw-bold mb-4">Storage Location</div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Warehouse name</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="wareHouse"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.wareHouse || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Rack</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="rack"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.rack || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Shelf</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="shelf"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.shelf || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Shelf space</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="shelfSpace"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.shelfSpace || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">
                  Storage condition
                </Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="storageCondition"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.storageCondition || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Storage date</Form.Label>
                <div className="mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ width: "100%" }}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-root": { height: "45px" },
                        }}
                        value={
                          product?.storageDate
                            ? dayjs(product.storageDate)
                            : null
                        }
                        name="storageDate"
                        readOnly
                      />
                    </Box>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Expiry date</Form.Label>
                <div className="mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ width: "100%" }}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-root": { height: "45px" },
                        }}
                        value={
                          product?.expiryDate ? dayjs(product.expiryDate) : null
                        }
                        name="expiryDate"
                        readOnly
                      />
                    </Box>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Location</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="fw-bold mb-4">Purchase information</div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">MRP</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="MRP"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.MRP || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">
                  Purchase amount
                </Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="purchaseRate"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.purchaseRate || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="newItems-textfield">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">Unit price</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="unitPrice"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.unitPrice || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label className="custom-label">GST</Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    name="GST"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    value={product?.GST || ""}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="fw-bold mb-4">Sales information</div>
          <div className="col-md-5 mb-4">
            <Form.Group>
              <Form.Label className="custom-label">Sale price</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  name="salePrice"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  value={formData.salePrice || ""}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Description</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  name="description"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="description-textfield"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="fw-bold mb-4 mt-4">Inventory tracking</div>
          <div className="col-md-5 mb-4">
            <Form.Group>
              <Form.Label className="custom-label">
                Opening inventory
              </Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  name="openingInventory"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  value={formData.openingInventory || ""}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label className="custom-label">Restock point</Form.Label>
              <InputGroup className="mt-2">
                <Form.Control
                  name="restockPoint"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  value={formData.restockPoint || ""}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="save-cancel-btn">
            <button type="submit" className="btn newItems-save-btn">
              Save
            </button>
            <button type="button" className="btn newItems-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateNewItems;
