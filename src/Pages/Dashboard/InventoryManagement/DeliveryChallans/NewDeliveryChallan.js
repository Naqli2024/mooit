import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LiaMinusCircleSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import Select from "react-select";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCoulmnModal from "../Salesorder/AddCoulmnModal";
const NewDeliveryChallan = ({ backToList }) => {
  const [rows, setRows] = useState([
    { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
  ]);

  const [addColumn, setAddColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [saleOrderId, setSaleOrderId] = useState("");
  const [formData, setFormData] = useState({
    saleType: "",
    customerName: "",
    salesOrderId: saleOrderId,
    salesorderDate: "",
    paymentTerms: "",
    shipmentDate: "",
    deliveryMethod: "",
    deliveryDate: "",
    salesPerson: "",
    itemDetails: rows,
    subTotal: 0,
    shipmentCharges: 0,
    total: 0,
  });
  const addRow = () => {
    setRows([
      ...rows,
      { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
    ]);
  };
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    quantity: true,
    price: true,
    discount: true,
    gst: true,
  });
  const [columns, setColumns] = useState([
    { key: "name", label: "Name", width: "22%", type: "text", colSpan: 2 },
    { key: "quantity", label: "Quantity", width: "6%", type: "number" },
    { key: "price", label: "Price", width: "8%", type: "number" },
    { key: "discount", label: "Discount", width: "6%", type: "number" },
    { key: "gst", label: "GST", width: "6%", type: "number" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    updatedRows[index].amount =
      updatedRows[index].price -
      updatedRows[index].discount +
      (updatedRows[index].price * updatedRows[index].gst) / 100;

    setRows(updatedRows);

    //calculate total and subTotal dynamically
    const newSubTotal = updatedRows.reduce((sum, row) => sum + row.amount, 0);
    setFormData((prev) => ({
      ...prev,
      itemDetails: updatedRows,
      subTotal: newSubTotal,
      total: newSubTotal + Number(prev.shipmentCharges),
    }));
  };
  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newKey = newColumnName.toLowerCase();
      setColumns([
        ...columns,
        {
          key: newKey,
          label: newColumnName,
          type: "text",
          width: "8%",
          isNew: true,
        },
      ]);
      setRows(rows.map((row) => ({ ...row, [newKey]: "" })));

      // Add new column to columnVisibility with default visibility as true
      setColumnVisibility((prev) => ({
        ...prev,
        [newKey]: true,
      }));

      setAddColumn(false);
      setNewColumnName("");
    }
  };
  //To remove the newly added column
  const handleColumnToggle = (key) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setColumns((prevColumn) =>
      prevColumn.filter((column) => column.key != key)
    );
  };

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
  ];

  const handleSaveNewDeliveryChallan = () => {};
  return (
    <div className="purchase-list">
      <h2>New Delivery Challans</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="new-package-form">
        <div className="new-package-name-sales mb-4">
          <Form.Group className="col-md-5 customer-name-dropdown">
            <Form.Label className="custom-label">Customer name</Form.Label>
            <div className="form-group inventory-custom-dropdown">
              <Select
                options={categoryOptions}
                isSearchable={true}
                classNamePrefix="custom-select"
              />
            </div>
          </Form.Group>
          <Form.Group className="col-md-5 customer-name-dropdown me-md-5">
            <Form.Label className="custom-label">Sales order</Form.Label>
            <div className="form-group inventory-custom-dropdown">
              <Select
                options={categoryOptions}
                isSearchable={true}
                classNamePrefix="custom-select"
              />
            </div>
          </Form.Group>
        </div>
        <hr />
          <div className="sales-order-bill mb-4">
            <div className="fw-bold">Shipping address</div>
            <div>xxxxxxxxxxxx</div>
            <div>xxxxxxxxxxxx</div>
            <div>xxxxxxxxxxxx</div>
          </div>
        <div className="new-delivery-form mb-4 mt-5">
          <div className="col-md-4">
            <Form.Group>
              <Form.Label className="custom-label">Delivery challan</Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-4 form-right-field">
            <Form.Group>
              <Form.Label className="custom-label">
                Delivery challan date
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                  type="date"
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <div className="new-delivery-form mb-4">
          <div className="col-md-4">
            <Form.Group>
              <Form.Label className="custom-label">
                Expected delivery date
              </Form.Label>
              <InputGroup className="mt-1">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="packageReceipt"
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-4 form-right-field">
            <Form.Group className="delivery-dropdown">
              <Form.Label className="custom-label">Challan type</Form.Label>
              <div className="form-group inventory-custom-dropdown mt-1">
                <Select
                  options={categoryOptions}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "45px",
                    }),
                  }}
                />
              </div>
            </Form.Group>
          </div>
        </div>
        <div className="sales-table-outer-border mt-5">
          <div className="item-details">
            <h3>Item details</h3>
            <div
              className="goBack-btn"
              onClick={() => setAddColumn(!addColumn)}
            >
              <span className="me-1">
                <EditOutlinedIcon />
              </span>
              Edit column
            </div>
          </div>
          <table className="custom-table new-sales-table">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  if (!columnVisibility[column.key]) return null;
                  return (
                    <th
                      key={index}
                      className="sales-name-text"
                      colSpan={column.colSpan || ""}
                      style={{ width: column.width }}
                    >
                      <div className="sales-name-container">
                        {column.label}
                        {/* Show icon only for newly added columns */}
                        {column.isNew && (
                          <LiaMinusCircleSolid
                            className="remove-icon"
                            onClick={() => handleColumnToggle(column.key)}
                          />
                        )}
                      </div>
                    </th>
                  );
                })}
                <th className="sales-name-text" style={{ width: "8%" }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => {
                    if (!columnVisibility[column.key]) return null;

                    // Check if this is the first column (e.g., "Name" column)
                    if (colIndex === 0) {
                      return (
                        <td
                          key={colIndex}
                          className="col-span-2"
                          colSpan={column.colSpan || ""}
                          style={{ width: column.width }}
                        >
                          <div className="form-group inventory-custom-dropdown">
                            <Select
                              options={categoryOptions}
                              isSearchable={true}
                              classNamePrefix="custom-select"
                              menuPlacement="top"
                              value={categoryOptions.find(
                                (option) => option.value === row[column.key]
                              )}
                              onChange={(selectedOption) =>
                                handleInputChange(
                                  index,
                                  column.key,
                                  selectedOption.value
                                )
                              }
                            />
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={colIndex}
                        className="col-span-2"
                        colSpan={column.colSpan || ""}
                        style={{ width: column.width }}
                      >
                        <input
                          className="select-an-item"
                          type={column.type}
                          value={row[column.key] || ""}
                          onChange={(e) =>
                            handleInputChange(index, column.key, e.target.value)
                          }
                        />
                      </td>
                    );
                  })}
                  <td style={{ width: "8%" }}>
                    <input
                      type="number"
                      value={row.amount.toFixed(2)}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addRow} className="add-item-button">
            Add an item +
          </button>
        </div>
        <div className="container-fluid mt-5">
              <div className="row button-top-padding">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    onClick={handleSaveNewDeliveryChallan}
                    className="btn flex-grow-1"
                    style={{ color: "white", backgroundColor: "#1F3F7F" }}
                  >
                    Save as draft
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
      {setAddColumn && (
        <AddCoulmnModal
          addColumn={addColumn}
          setAddColumn={setAddColumn}
          setNewColumnName={setNewColumnName}
          handleAddColumn={handleAddColumn}
        />
      )}
    </div>
  );
};

export default NewDeliveryChallan;
