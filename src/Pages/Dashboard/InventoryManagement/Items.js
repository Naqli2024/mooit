import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ProductDetails from "./ProductDetails";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { products } from "../../../Data/ProductData";
import CreateNewItems from "./CreateNewItems";

const Items = () => {
  const [productDetails, setProductDetails] = useState(false);
  const [createNewItems, setNewItems] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        <CreateNewItems backToList={backToList}/>
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
              <button type="button" onClick={createNewItemsOnClick} className="btn create-new-btn">
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
                {/* Original Dropdown */}
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Select a Category
                  </Form.Label>
                  <Form.Select className="inventory-custom-dropdown">
                    <option>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Select a Sub Category
                  </Form.Label>
                  <Form.Select className="inventory-custom-dropdown">
                    <option>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Filter by Brand name
                  </Form.Label>
                  <Form.Select className="inventory-custom-dropdown">
                    <option>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-2 inventory-category-dropdown">
                  <Form.Label className="custom-label">
                    Filter by Supplier
                  </Form.Label>
                  <Form.Select className="inventory-custom-dropdown">
                    <option>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
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
