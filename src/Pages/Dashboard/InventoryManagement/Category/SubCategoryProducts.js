import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const SubCategoryProducts = ({ backToList, data }) => {
  const navigate = useNavigate();
  const [querySearch, setQuerySearch] = useState("");

  const filteredData = Array.isArray(data)
    ? data.filter((productData) =>
        ["productName", "sku", "brandName"].some((key) =>
          productData?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleSubCategory = () => {
    navigate("/admin/items");
  };

  return (
    <div className="purchase-list">
      <h2>Sub-Category</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="sales-return search-btn">
        <div className="col-md-4">
          <InputGroup className="search-input">
            <Form.Control
              className="text-field search-icon-btn"
              placeholder="Search here"
              aria-label="Search"
              value={querySearch}
              onChange={(e) => setQuerySearch(e.target.value)}
            />
            <div className="divider"></div>
            <Button variant="outline-secondary" className="search-icon-btn">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className="table-container mt-5 mx-4">
        <Table
          bordered
          className="custom-table sales-in-outbound-table delivery-tableHeader"
        >
          <thead>
            <tr>
              <th>Product name</th>
              <th>SKU</th>
              <th>Brand name</th>
              <th>Unit price</th>
              <th>Total quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.productName}</td>
                  <td className="purchase-id" onClick={handleSubCategory}>
                    {data.sku}
                  </td>
                  <td>{data.brandName}</td>
                  <td>{data.unitPrice}</td>
                  <td>{data.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No products found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SubCategoryProducts;
