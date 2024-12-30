import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ProductDetails from "./ProductDetails";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { products } from "../../../Data/ProductData";
import CreateNewItems from "./CreateNewItems";
import Select from "react-select";

const Items = () => {
  const [productDetails, setProductDetails] = useState(false);
  const [createNewItems, setNewItems] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [categoryOption, setCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [supplierOption, setSupplierOption] = useState(null);

  const options = [
    { value: "all", label: "All" },
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
  ];

  const handleCategoryChange = (selectedOption) => {
    setCategoryOption(selectedOption);
  };
  const handleBrandChange = (selectedOption) => {
    setBrandOption(selectedOption);
  };
  const handleSupplierChange = (selectedOption) => {
    setSupplierOption(selectedOption);
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleOnClick = () => {
    setProductDetails(true);
  };
  const backToList = () => {
    setProductDetails(false);
    setNewItems(false);
  };
  const handleCardClick = (e) => {
    if (e.target.type !== "checkbox") {
      handleOnClick();
    }
  };
  const createNewItemsOnClick = () => {
    setNewItems(true);
  };
  return (
    <div>
      {productDetails ? (
        <ProductDetails backToList={backToList} />
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
                      options={options}
                      value={categoryOption}
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
                      options={options}
                      value={brandOption}
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
                      options={options}
                      value={supplierOption}
                      onChange={handleSupplierChange}
                      isSearchable={true}
                      classNamePrefix="custom-select"
                    />
                  </div>
                </Form.Group>
              </div>
            )}
            <div className="inventory-product">
              {products.map((product) => (
                <div
                  className={`inventory-card ${isChecked ? "checked" : ""}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleCardClick}
                >
                  <div className="product-text">{product.name}</div>
                  <div className="mb-3">{product.sku}</div>
                  <div className="mb-3">
                    Stock on hand:{" "}
                    <span className="stock-hand">{product.stock}</span>
                  </div>
                  <div className="mb-3">Sales Price: {product.price}</div>
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
            <div className="inventory-product">
              <div className="inventory-card" onClick={handleOnClick}>
                <div className="product-text">Product name</div>
                <div className="mb-3">SKU-XXXXXX</div>
                <div className="mb-3 low-stock">Low stock: 68</div>
                <div className="mb-3">Sales Price: 6574</div>
              </div>
              <div className="inventory-card" onClick={handleOnClick}>
                <div className="product-text">Product name</div>
                <div className="mb-3">SKU-XXXXXX</div>
                <div className="mb-3 low-stock">Low stock: 68</div>
                <div className="mb-3">Sales Price: 6574</div>
              </div>
              <div className="inventory-card" onClick={handleOnClick}>
                <div className="product-text">Product name</div>
                <div className="mb-3">SKU-XXXXXX</div>
                <div className="mb-3 low-stock">Low stock: 68</div>
                <div className="mb-3">Sales Price: 6574</div>
              </div>
              <div className="inventory-card" onClick={handleOnClick}>
                <div className="product-text">Product name</div>
                <div className="mb-3">SKU-XXXXXX</div>
                <div className="mb-3 low-stock">Low stock: 68</div>
                <div className="mb-3">Sales Price: 6574</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
