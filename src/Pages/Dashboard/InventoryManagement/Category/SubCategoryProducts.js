import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";


const SubCategoryProducts = ({backToList}) => {
  const navigate = useNavigate();
 
  const handleSubCategory = () => {
    navigate("/admin/items");
  }


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
                />
                <div className="divider"></div>
                <Button variant="outline-secondary" className="search-icon-btn">
                  <FaSearch />
                </Button>
              </InputGroup>
            </div>
          </div>
          <div className="table-container mt-5 mx-4">
            <Table bordered className="custom-table sales-in-outbound-table delivery-tableHeader">
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
                <tr>
                  <td>Glass catridge</td>
                  <td className="purchase-id" onClick={handleSubCategory}>#FU-5673633</td>
                  <td>Bosh</td>
                  <td>12.00</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Automotive fuse</td>
                  <td className="purchase-id" onClick={handleSubCategory}>#FU-5673633</td>
                  <td>Denso</td>
                  <td>10.00</td>
                  <td>50</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
  )
}


export default SubCategoryProducts