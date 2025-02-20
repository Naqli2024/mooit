import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { Col, Form, Row } from "react-bootstrap";
import { createSaleOrder } from "../../../../Redux/salesOrder/createSaleOrder";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GoPlusCircle } from "react-icons/go";
import { LiaMinusCircleSolid } from "react-icons/lia";
import AddCoulmnModal from "./AddCoulmnModal";
import { ImSpinner3 } from "react-icons/im";
import { generateSalesOrderId } from "../../../../Redux/salesOrder/generateSalesOrderId";
import { useNavigate } from "react-router-dom";
import { getAllSourceDepartment } from "../../../../Redux/sourceDepartment/sourceDepartmentSlice";
import { getPurchaseByproductName } from "../../../../Redux/features/getPurchaseByProductName";
import { getPurchaseDetails } from "../../../../Redux/features/getPurchaseDetailsSlice";

const InBoundSaleOrderForm = ({ backToList, activeTab }) => {
  const { loading, allSaleOrder, error } = useSelector(
    (state) => state.getAllSalesorder
  );
  const { purchaseDetails, purchaseByproductName } = useSelector((state) => ({
    purchaseDetails: state.getPurchaseDetails?.data,
    purchaseByproductName: state.getPurchaseByproductName?.data,
  }));
  const { sourceDepartment } = useSelector((state) => state.sourceDepartment);
  const [rows, setRows] = useState([
    { itemName: "", quantity: 1, price: 0.0, discount: 0, gst: 0, total: 0 },
  ]);
  const [storeName, setStoreName] = useState([
    { value: "", label: "" },
    { value: "add_store", label: "+ Add Store" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addStore, setAddStore] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [saleOrderId, setSaleOrderId] = useState("");
  const [formData, setFormData] = useState({
    saleType: activeTab,
    storeDepartment: "",
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
  const navigate = useNavigate();
  const [AddColumn, setAddColumn] = useState(false);
  const [openShipmentCharges, setShipmentCharges] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    quantity: true,
    price: true,
    discount: true,
    gst: true,
  });
  const [columns, setColumns] = useState([
    {
      id: "itemName",
      label: "Item Name",
      width: "22%",
      type: "text",
      isStatic: true,
    },
    {
      id: "quantity",
      label: "Quantity",
      width: "6%",
      type: "text",
      isStatic: true,
    },
    { id: "price", label: "Price", width: "8%", type: "text", isStatic: true },
    {
      id: "discount",
      label: "Discount",
      width: "6%",
      type: "text",
      isStatic: true,
    },
    { id: "gst", label: "GST", width: "6%", type: "text", isStatic: true },
    { id: "total", label: "Total", width: "6%", type: "text", isStatic: true },
  ]);

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.id] = col.isStatic ? (col.id === "quantity" ? 1 : 0) : "";
      return acc;
    }, {});
    setRows([...rows, newRow]);
  };

  const handleChange = (selectedOption) => {
    if (selectedOption && selectedOption.value == "add_store") {
      setAddStore(!addStore);
      navigate("/admin/source-department");
      setSelectedOption(null);
    } else {
      setSelectedOption(selectedOption);
      setFormData((prev) => ({ ...prev, sourceDepartment: selectedOption.value }));
    }
  };

  const removeColumn = (columnId) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setRows((prev) =>
      prev.map((row) => {
        const newRow = { ...row };
        delete newRow[columnId];
        return newRow;
      })
    );
  };

  const handleProductChange = (index, selectedItem) => {
    const product = purchaseDetails.find((p) => p.productName === selectedItem);
    const newRows = [...rows];

    if (product) {
      newRows[index] = {
        ...newRows[index],
        itemName: selectedItem,
        price: product.unitPrice,
        gst: product.GST,
      };
      setRows(newRows);
    }
  };

  //To add new column action for handling dynamic behavior
  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const colName = newColumnName.toLowerCase();
      const newColumn = {
        id: colName,
        label: newColumnName,
        type: "text",
        isStatic: false,
        width: "6%",
      };

      // Find the index of the "total" column
      const totalIndex = columns.findIndex((col) => col.id === "total");

      // Insert the new column before the "total" column
      const updatedColumns = [
        ...columns.slice(0, totalIndex),
        newColumn,
        ...columns.slice(totalIndex),
      ];

      setColumns(updatedColumns);
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          [colName]: "",
        }))
      );
    }
    setAddColumn(!AddColumn);
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
          storeDepartment: "",
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
        setTimeout(() => backToList(), 3000)
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
  const filterStoreName = () => {
    if (!Array.isArray(sourceDepartment)) return;

    const filterStoreNames = sourceDepartment.map((dept) => ({
      label: dept.departmentName,
      value: dept.departmentName,
    }));

    setStoreName([
      ...filterStoreNames,
      { value: "add_store", label: "+ Add Store" },
    ]);
  };

  //Fetching sale order details from api by getAllSaleOrder action
  useEffect(() => {
    dispatch(getAllSalesOrder());
    dispatch(getAllSourceDepartment());
    dispatch(getPurchaseDetails());
  }, [dispatch]);

  useEffect(() => {
    if (sourceDepartment?.length > 0) {
      filterStoreName();
    }
  }, [sourceDepartment]);

  useEffect(() => {
    dispatch(generateSalesOrderId())
      .unwrap()
      .then((response) => {
        setSaleOrderId(response.data);
        setFormData((prevData) => ({
          ...prevData,
          salesOrderId: response.data,
        }));
      });
  }, []);

  useEffect(() => {
    const updatedRows = rows.map((row) => ({
      ...row,
      total: row.price * (1 + row.gst / 100) * row.quantity - row.discount,
    }));

    // Only set rows if they actually change
    if (JSON.stringify(updatedRows) !== JSON.stringify(rows)) {
      setRows(updatedRows);
    }

    const newSubTotal = updatedRows.reduce((acc, row) => acc + row.total, 0);

    setFormData((prevFormData) => {
      const openShipmentChargesNumber = parseFloat(openShipmentCharges || 0);
      return {
        ...prevFormData,
        subTotal: newSubTotal,
        total: newSubTotal + openShipmentChargesNumber,
        itemDetails: updatedRows,
      };
    });
  }, [rows, openShipmentCharges]);

  useEffect(() => {
    if (addStore) {
      navigate("/admin/source-department");
    }
  }, [addStore]);

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
            {!addStore && (
              <Form.Group className="mb-5">
                <Form.Label className="custom-label ">
                  Source Department
                </Form.Label>
                <Select
                  options={storeName}
                  value={selectedOption || null}
                  onChange={handleChange}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  placeholder="Select or type here"
                  className="sales-order-label"
                />
              </Form.Group>
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

          <Row className="row-cols-custom mb-4 mt-4">
            <Col>
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

            <Col>
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

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Shipment Date</Form.Label>
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
          </Row>

          <Row className="row-cols-custom mb-4">
            <Col>
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
                  <option value="select" readOnly>
                    Select
                  </option>
                  <option value="Express Delivery">Express Delivery</option>
                  <option value="Consolidated Shipping">
                    Consolidated Shipping
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Sales Person</Form.Label>
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

            {/* Add an empty column */}
            <Col></Col>
          </Row>

          <Row>
            <div className="sales-table-outer-border mt-5">
              <div className="item-details">
                <h3>Item details</h3>
                <div
                  className="goBack-btn"
                  onClick={() => setAddColumn(!AddColumn)}
                >
                  <span className="me-1">
                    <GoPlusCircle />
                  </span>
                  Add column
                </div>
              </div>
              <table className="custom-table new-sales-table">
                <thead>
                  <tr>
                    {columns.map((column, index) => {
                      return (
                        <th
                          key={column.id}
                          className="sales-name-text"
                          colSpan={column.colSpan || ""}
                          style={{ width: column.width }}
                        >
                          <div className="sales-name-container">
                            {column.label}
                            {/* Show icon only for newly added columns */}
                            {!column.isStatic && (
                              <LiaMinusCircleSolid
                                className="remove-icon"
                                onClick={() => removeColumn(column.id)}
                              />
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => {
                        if (col.id === "itemName") {
                          return (
                            <td key={col.id}>
                              <select
                                value={row.itemName}
                                onChange={(e) =>
                                  handleProductChange(index, e.target.value)
                                }
                              >
                                <option value="">Select Item</option>
                                {purchaseDetails?.map((product, i) => (
                                  <option key={i} value={product.productName}>
                                    {product.productName}
                                  </option>
                                ))}
                              </select>
                            </td>
                          );
                        }

                        if (["price", "gst", "total"].includes(col.id)) {
                          return (
                            <td key={col.id}>
                              <input
                                value={
                                  col.id === "total"
                                    ? row[col.id]?.toFixed(2)
                                    : row[col.id]
                                }
                                readOnly
                              />
                            </td>
                          );
                        }

                        if (["quantity", "discount"].includes(col.id)) {
                          return (
                            <td key={col.id}>
                              <input
                                type="number"
                                value={row[col.id]}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index][col.id] = parseFloat(
                                    e.target.value
                                  );
                                  setRows(newRows);
                                }}
                              />
                            </td>
                          );
                        }

                        return (
                          <td key={col.id}>
                            <input
                              value={row[col.id] || ""}
                              onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index][col.id] = e.target.value;
                                setRows(newRows);
                              }}
                            />
                          </td>
                        );
                      })}
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
                  value={openShipmentCharges}
                  onChange={(e) => {
                    setShipmentCharges(parseFloat(e.target.value) || 0);
                    setFormData((prev) => ({
                      ...prev,
                      shipmentCharges: parseFloat(e.target.value) || 0,
                    }));
                  }}
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
          addColumn={AddColumn}
          setAddColumn={setAddColumn}
          setNewColumnName={setNewColumnName}
          handleAddColumn={handleAddColumn}
        />
      )}
    </>
  );
};

export default InBoundSaleOrderForm;
