import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ProductDetails from "../Items/ProductDetails";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import CreateNewItems from "./CreateNewItems";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getInventories } from "../../../../Redux/inventory/getInventoriesSlice";

const Items = () => {
  const [productDetails, setProductDetails] = useState(false);
  const [createNewItems, setNewItems] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedSupplierOption, setSelectedSupplierOption] = useState(null);
  const dispatch = useDispatch();
  const { loading, inventories, error } = useSelector(
    (state) => state.getInventories
  );
  const [sku, setSKU] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const categoryOptions = [
    { label: "All", value: "All" },
    ...Array.from(
      new Set(inventories?.map((inventories) => inventories.category || ""))
    ).map((category) => ({
      label: category,
      value: category,
    })),
  ];

  const brandOptions = [
    { label: "All", value: "All" },
    ...Array.from(
      new Set(inventories?.map((inventories) => inventories.brandName || ""))
    ).map((inventory) => ({
      label: inventory,
      value: inventory,
    })),
  ];

  const supplierOptions = [
    { label: "All", value: "All" },
    ...Array.from(
      new Set(inventories?.map((inventories) => inventories.vendorName || ""))
    ).map((supplier) => ({
      label: supplier,
      value: supplier,
    })),
  ];

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategoryOption(selectedOption);
  };
  const handleBrandChange = (selectedOption) => {
    setSelectedBrandOption(selectedOption);
  };
  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplierOption(selectedOption);
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleOnClick = (sku) => {
    setProductDetails(true);
    setSKU(sku);
  };
  const backToList = () => {
    setProductDetails(false);
    setNewItems(false);
  };
  const handleCardClick = (e, sku) => {
    if (e.target.type !== "checkbox") {
      handleOnClick(sku);
    }
  };
  const createNewItemsOnClick = () => {
    setNewItems(true);
  };

  const filteredData = inventories?.filter((inventory) => {
    const matchCriteria =
      !querySearch ||
      inventory.productName.toLowerCase().includes(querySearch.toLowerCase());
    const matchCategory =
      !selectedCategoryOption ||
      selectedCategoryOption.value === "All" ||
      inventory.category === selectedCategoryOption.value;
    const matchBrandName =
      !selectedBrandOption ||
      selectedBrandOption.value === "All" ||
      inventory.brandName === selectedBrandOption.value;
    const supplierName =
      !selectedSupplierOption ||
      selectedSupplierOption.value === "All" ||
      inventory.vendorName === selectedSupplierOption.value;
    return matchCriteria && matchCategory && matchBrandName && supplierName;
  });

  useEffect(() => {
    dispatch(getInventories());
  }, [dispatch, inventories]);

  return (
    <div>
      {productDetails ? (
        <ProductDetails backToList={backToList} sku={sku} />
      ) : createNewItems ? (
        <CreateNewItems backToList={backToList} />
      ) : (
        <>
          <div className="purchase-list">
            <h2>Inventory Management</h2>
          </div>
          <div className="items-content">
            <div className="search-btn">
              <div className="col-md-4">
                <InputGroup className="search-input">
                  <Form.Control
                    className="text-field"
                    placeholder="Search here"
                    aria-label="Search"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                  />
                  <div className="divider"></div>
                  <Button
                    variant="outline-secondary"
                    className="search-icon-btn"
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </div>
              <button
                type="button"
                onClick={createNewItemsOnClick}
                className="btn create-new-btn"
              >
                Create new
              </button>
            </div>
            {isChecked ? (
              <div className="edit-print-del-btn mt-3">
                <div className="action-btn edit-btn">
                  <input
                    type="checkbox"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  Select All
                </div>
                <div className="divider"></div>
                <div className="action-btn edit-btn">
                  <EditOutlinedIcon className="action-icon" />
                  Edit
                </div>
                <div className="divider"></div>
                <div className="action-btn print-btn">
                  <DriveFileRenameOutlineIcon className="action-icon" />
                  Rename
                </div>
                <div className="divider"></div>
                <div className="action-btn delete-btn">
                  <DeleteOutlineSharpIcon className="action-icon" />
                  Delete
                </div>
                <div className="divider"></div>
              </div>
            ) : (
              <div className="inventory-dropdown">
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Select a Category
                  </Form.Label>
                  <div className="form-group inventory-custom-dropdown">
                    <Select
                      options={categoryOptions}
                      value={selectedCategoryOption}
                      onChange={handleCategoryChange}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Filter by Brand name
                  </Form.Label>
                  <div className="form-group inventory-custom-dropdown">
                    <Select
                      options={brandOptions}
                      value={selectedBrandOption}
                      onChange={handleBrandChange}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Filter by Supplier
                  </Form.Label>
                  <div className="form-group inventory-custom-dropdown">
                    <Select
                      options={supplierOptions}
                      value={selectedSupplierOption}
                      onChange={handleSupplierChange}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                    />
                  </div>
                </Form.Group>
              </div>
            )}
            <div className="inventory-product">
              {filteredData &&
                filteredData.map((filteredData) => (
                  <div
                    className={`inventory-card ${isChecked ? "checked" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => handleCardClick(e, filteredData.sku)}
                  >
                    <div className="product-text">
                      {filteredData.productName}
                    </div>
                    <div className="mb-3">SKU: {filteredData.sku}</div>
                    <div className="mb-3">
                      Stock on hand: <span className="stock-hand">{""}</span>
                    </div>
                    <div className="mb-3">
                      Sales Price: {filteredData.salesInformation.salePrice}
                    </div>
                    {(isHovered || isChecked) && (
                      <input
                        type="checkbox"
                        className="select-checkbox"
                        onChange={handleCheckboxChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
