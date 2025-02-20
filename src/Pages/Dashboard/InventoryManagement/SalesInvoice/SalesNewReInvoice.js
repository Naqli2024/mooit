import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LiaMinusCircleSolid } from "react-icons/lia";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCoulmnModal from "../Salesorder/AddCoulmnModal";
import { newSalesReInvoiceSchema } from "../../../../Helper/validation";
import SalesReInvoiceDetails from "./SalesReInvoiceDetails";
import { paymentTerms } from "../../../../Data/SalesOrderData";

const SalesNewReInvoice = ({backToList}) => {
        const [rows, setRows] = useState([
          { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
        ]);
        const [addColumn, setAddColumn] = useState(false);
        const [newColumnName, setNewColumnName] = useState("");
        const [openSalesReInvoiceDetails, setOpenSalesReInvoiceDetails] = useState(false);
      
        const {
          register,
          handleSubmit,
          setValue,
          trigger,
          formState: { errors },
        } = useForm({ resolver: yupResolver(newSalesReInvoiceSchema) });
      
        const onSubmit = (data) => {
          setOpenSalesReInvoiceDetails(true);
        };
      
        const categoryOptions = [
          { value: "electronics", label: "Electronics" },
          { value: "furniture", label: "Furniture" },
        ];
      
        const [formData, setFormData] = useState({
          saleType: "",
          customerName: "",
          salesOrderId: "",
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
            setColumnVisibility((prev) => ({
              ...prev,
              [newKey]: true,
            }));
      
            setAddColumn(false);
            setNewColumnName("");
          }
        };
      
        const handleColumnToggle = (key) => {
          setColumnVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
          }));
          setColumns((prevColumn) =>
            prevColumn.filter((column) => column.key != key)
          );
        };

  return (
    <div>
      {openSalesReInvoiceDetails ? <SalesReInvoiceDetails backToList={()=>(setOpenSalesReInvoiceDetails(false))}/>
      : ( <div className="purchase-list">
        <h2>Sales (Re-invoice)</h2>
        <button onClick={backToList} className="goBack-btn">
          <span>
            <ArrowBackIosIcon />
          </span>
          Back
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="salesInvoice-form">
          <div className="new-package-name-sales mb-4 mt-5">
            <Form.Group className="col-md-4 customer-name-dropdown">
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="custom-label mb-0">
                  Customer name
                </Form.Label>
                {errors.customerName && (
                  <ErrorOutlineOutlinedIcon className="text-danger" />
                )}
              </div>
              <div className="form-group inventory-custom-dropdown mt-2">
                <Select
                  options={categoryOptions}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  onChange={(selected) => {
                    setValue("customerName", selected.value);
                    trigger("customerName");
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group className="col-md-4 customer-name-dropdown me-md-5 form-right-field">
              <div className="d-flex align-items-center">
                <Form.Label className="custom-label mb-0">
                  Sales order
                </Form.Label>
                {errors.salesOrder && (
                  <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                )}
              </div>
              <div className="form-group inventory-custom-dropdown mt-2">
                <Select
                  options={categoryOptions}
                  isSearchable={true}
                  classNamePrefix="custom-select"
                  onChange={(selected) => {
                    setValue("salesOrder", selected.value);
                    trigger("salesOrder");
                  }}
                />
              </div>
            </Form.Group>
          </div>
          <hr />
          <div className="sales-address">
            <div className="billing-address">
              <div className="edit-icon">
                Billing address
                <span>
                  <EditOutlinedIcon />
                </span>
              </div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
            <div className="shipping-address">
              <div className="edit-icon">
                Shipping address
                <span>
                  <EditOutlinedIcon />
                </span>
              </div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
          </div>
          <div className="new-package-name-sales mb-4 mt-4">
            <div className="col-md-3 mt-3">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Invoice id
                  </Form.Label>
                  {errors.invoiceId && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="custom-textfield"
                    {...register("invoiceId")}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-3 mt-3">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Invoice date
                  </Form.Label>
                  {errors.invoiceDate && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="custom-textfield"
                    type="date"
                    {...register("invoiceDate")}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-3 mt-3">
            <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Payment terms
                    </Form.Label>
                    {errors.paymentTerms && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Select
                      className="custom-textfield"
                      {...register("paymentTerms")}
                    >
                        {paymentTerms.map((terms)=>(
                            <option>{terms}</option>
                        ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
            </div>
          </div>
          <div className="new-package-name-sales mb-4 mt-4">
            <div className="col-md-3 mt-3">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Due date
                  </Form.Label>
                  {errors.dueDate && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="custom-textfield"
                    type="date"
                    {...register("dueDate")}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-3 mt-3">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Order no
                  </Form.Label>
                  {errors.orderNumber && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="custom-textfield"
                    {...register("orderNumber")}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-3 mt-3"></div>
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
          <div className="credit-note-bottom-content me-3">
            <div className="open-inventory mb-3">
              <p className="col-md-8">Subtotal</p>
              <p className="col-md-3 d-flex justify-content-center fw-normal">
                850
              </p>
            </div>
            <div className="open-inventory mb-3">
              <p className="col-md-8">Shipping charges</p>
              <p className="col-md-3 d-flex justify-content-center">
                500
              </p>
            </div>
            <div className="open-inventory mb-3">
              <p className="col-md-8">VAT%</p>
              <p className="col-md-3 d-flex justify-content-center">
               15
              </p>
            </div>
            <div className="open-inventory fw-bold">
              <p className="col-md-8">Total amount</p>
              <p className="col-md-3 d-flex justify-content-center">200</p>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center mt-5">
              <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{ color: "white", backgroundColor: "#1F3F7F" }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button className="btn btn-danger flex-grow-1">Cancel</button>
              </div>
            </div>
          </div>
        </form>
        {setAddColumn && (
          <AddCoulmnModal
            addColumn={addColumn}
            setAddColumn={setAddColumn}
            setNewColumnName={setNewColumnName}
            handleAddColumn={handleAddColumn}
          />
        )}
      </div>
      )
    }
    </div>
  )
}

export default SalesNewReInvoice