import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { paymentTerms } from "../../../../Data/SalesOrderData";
import Select from "react-select";
import { LiaMinusCircleSolid } from "react-icons/lia";
import { ImSpinner3 } from "react-icons/im";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { createSaleOrder } from "../../../../Redux/salesOrder/createSaleOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoPlusCircle } from "react-icons/go";
import AddCoulmnModal from "./AddCoulmnModal";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { generateSalesOrderId } from "../../../../Redux/salesOrder/generateSalesOrderId";

const OutBoundSaleOrderForm = ({ backToList, activeTab }) => {
  const { loading, saleOrder, error } = useSelector(
    (state) => state.createSaleOrder
  );
  const { allSaleOrder } = useSelector((state) => state.getAllSalesorder);
  const [rows, setRows] = useState([
    { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
  ]);
  const [customerName, setCustomerName] = useState([
    { value: "", label: "" },
    { value: "add_customer", label: "+ Add Customer" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addCustomer, setAddCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [addColumn, setAddColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [saleOrderId, setSaleOrderId] = useState("");
  const [formData, setFormData] = useState({
    saleType: activeTab,
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
  const dispatch = useDispatch();
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

  // Items details table row custom funcitonality with amount calculation
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

  const handleChange = (selectedOption) => {
    if (selectedOption.value == "add_customer") {
      setAddCustomer(!addCustomer);
      setSelectedOption(null);
    } else {
      setSelectedOption(selectedOption);
    }
  };

  const handleCustomerNameChange = (e) => {
    setNewCustomerName(e.target.value);
  };

  // To add the new customer option(dropdown) and make it to selectedOption
  const handleAddCustomer = () => {
    const trimmedName = newCustomerName.trim();
    if (trimmedName) {
      setCustomerName((prev) => {
        const addCustomerOption = prev.find(
          (option) => option.value === "add_customer"
        );
        return [
          ...prev.filter((option) => option.value !== "add_customer"),
          { value: trimmedName, label: trimmedName },
          addCustomerOption,
        ];
      });
      setSelectedOption({ value: trimmedName, label: trimmedName });
      setFormData((prev) => ({ ...prev, customerName: trimmedName }));
      setAddCustomer(!addCustomer);
    }
  };

  // Add the shipment charges and recalculate the total amount instantly
  const handleShipmentCharges = (e) => {
    const newShipmentCharges = Number(e.target.value);
    setFormData({
      ...formData,
      shipmentCharges: newShipmentCharges,
      total: formData.subTotal + newShipmentCharges,
    });
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

  //To add new column action for handling dynamic behavior
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

  //Submit the form to create a saleOrder with toast response
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the createSaleOrder action
    dispatch(createSaleOrder(formData))
      .unwrap()
      .then((response) => {
        // Reset rows to clear itemDetails
        setRows([]);
        // Reset the form data immediately after the submission
        setFormData({
          saleType: activeTab,
          customerName: "",
          salesOrderId: "",
          salesorderDate: "",
          paymentTerms: "",
          shipmentDate: "",
          deliveryMethod: "",
          deliveryDate: "",
          salesPerson: "",
          itemDetails: [],
          subTotal: 0,
          shipmentCharges: 0,
          total: 0,
        });
        setSelectedOption(null);
        toast.success(response.message || "Sales Order created successfully!", {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
      })
      .catch((e) => {
        toast.error(
          error.message || "Failed to create sales order. Please try again.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      });
  };

  //filter the customerName from getAllSaleOrder data
  const filterCusterName = () => {
    const filterCustomerNames =
      allSaleOrder &&
      allSaleOrder.map((allSaleOrder) => ({
        label: allSaleOrder.customerName,
        value: allSaleOrder.customerName,
      }));
    setCustomerName([
      ...filterCustomerNames,
      { value: "add_customer", label: "+ Add Customer" },
    ]);
  };

  //Fetching sale order details from api by getAllSaleOrder action
  useEffect(() => {
    dispatch(getAllSalesOrder());
  }, [dispatch]);

  useEffect(() => {
    if (allSaleOrder && allSaleOrder.length > 0) {
      filterCusterName();
    }
    dispatch(generateSalesOrderId())
      .unwrap()
      .then((response) => setSaleOrderId(response.data));
  }, [allSaleOrder, dispatch]);

  useEffect(() => {
    if (saleOrderId) {
      setFormData((prevData) => ({
        ...prevData,
        salesOrderId: saleOrderId,
      }));
    }
  }, [saleOrderId]);

  return (
    <>
      <h2>Sales Order</h2>
      <button onClick={backToList} className="goBack-btn sales-back-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="saleOrder-form">
        <Form onSubmit={handleSubmit}>
          <Row>
            {!addCustomer ? (
              <Form.Group className="mb-5">
                <Form.Label className="custom-label ">Customer Name</Form.Label>
                <Select
                  options={customerName}
                  value={selectedOption || null}
                  onChange={handleChange}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  placeholder="Select or type here"
                  className="sales-order-label"
                />
              </Form.Group>
            ) : (
              <div>
                <Form.Control
                  type="text"
                  value={newCustomerName}
                  onChange={handleCustomerNameChange}
                  placeholder="Enter new customer name"
                  className="mt-2"
                />
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-primary me-2 btn-add-customer"
                    onClick={handleAddCustomer}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-add-customer"
                    onClick={() => setAddCustomer(!addCustomer)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Row>
          {/* <div className="sales-address">
            <div className="billing-address">
            <div className="edit-icon">Billing address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
            <div className="shipping-address">
            <div className="edit-icon">Shipping address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
          </div> */}

          <Row className="row-cols-auto justify-content-between mb-4 mt-4">
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales Order ID</Form.Label>
                <Form.Control
                  className="sales-order-label"
                  type="text"
                  value={formData.salesOrderId}
                  onChange={(e) =>
                    setFormData({ ...formData, salesOrderId: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales Order Date</Form.Label>
                <Form.Control
                  className="sales-order-label"
                  type="date"
                  value={formData.salesorderDate}
                  onChange={(e) =>
                    setFormData({ ...formData, salesorderDate: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Payment terms</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="sales-order-label"
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentTerms: e.target.value })
                  }
                >
                  {paymentTerms.map((terms) => (
                    <option>{terms}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="row-cols-auto justify-content-between mb-4">
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Estimated Shipment Date</Form.Label>
                <Form.Control
                  className="sales-order-label"
                  type="date"
                  value={formData.shipmentDate}
                  onChange={(e) =>
                    setFormData({ ...formData, shipmentDate: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Delivery Method</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="sales-order-label"
                  value={formData.deliveryMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryMethod: e.target.value })
                  }
                >
                  <option value="select">select</option>
                  <option value="Express Delivery">Express Delivery</option>
                  <option value="Consolidated Shipping">
                    Consolidated Shipping
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales person</Form.Label>
                <Form.Control
                  className="sales-order-label"
                  type="text"
                  value={formData.salesPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, salesPerson: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <div className="sales-table-outer-border">
              <div className="item-details">
                <h3>Item details</h3>
                <div
                  className="goBack-btn"
                  onClick={() => setAddColumn(!addColumn)}
                >
                  <span className="me-2">
                    <GoPlusCircle />
                  </span>
                  Add column
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
                                handleInputChange(
                                  index,
                                  column.key,
                                  e.target.value
                                )
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
              <button
                type="button"
                onClick={addRow}
                className="add-item-button"
              >
                Add an item +
              </button>
            </div>
          </Row>

          <div className="sales-bottom-content">
            <div className="open-inventory">
              <div className="col-md-8">Subtotal</div>
              <div className="col-md-3 fw-normal">{formData.subTotal}</div>
            </div>
            <div className="restock-point mt-3">
              <div className="col-md-8 fw-normal">Shipment charges</div>
              <div className="col-md-3 fw-normal">
                <input
                  type="text"
                  className="form-control"
                  value={formData.shipmentCharges}
                  onChange={handleShipmentCharges}
                />
              </div>
            </div>
            <div className="restock-point mt-3">
              <div className="col-md-8 fw-normal">Total</div>
              <div className="col-md-3 fw-normal">{formData.total}</div>
            </div>
          </div>
          <div className="new-sales-btn mt-5 mb-5">
            <button type="submit" className="btn btn-primary save-download-btn">
              Save & Download
            </button>
            <button type="submit" className="btn save-draft-btn">
              Save as draft
            </button>
            <button
              onClick={backToList}
              className="btn btn-danger sales-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <ImSpinner3 className="fa-spin" size={40} />
        </div>
      )}
      <ToastContainer />
      {setAddColumn && (
        <AddCoulmnModal
          addColumn={addColumn}
          setAddColumn={setAddColumn}
          setNewColumnName={setNewColumnName}
          handleAddColumn={handleAddColumn}
        />
      )}
    </>
  );
};

export default OutBoundSaleOrderForm;
