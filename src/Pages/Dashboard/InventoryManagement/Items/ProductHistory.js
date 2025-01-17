import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const ProductHistory = () => {
    const [selectedTable, setSelectedTable] = useState("purchase");
    const { loading, product, error } = useSelector(
      (state) => state.findPurchaseByItemName
    );

  return (
    <div>
    <div className="history-content">
      <div className="history-radio">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="purchase"
            name="radio-buttons-group"
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <FormControlLabel
              value="purchase"
              className="purchase-radio"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Purchase</span>}
            />
            <FormControlLabel
              value="sales"
              className="sales-radio"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "14px" }}>Sales</span>}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="history-table">
        {selectedTable === "purchase" && (
          <Table bordered className="custom-table">
            <thead className="history-table-head">
              <tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Total amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product.storageDate}</td>
                <td>{product.vendor}</td>
                <td>{product.quantity}</td>
                <td>{product.unitPrice}</td>
                <td>TotalAmount</td>
              </tr>
            </tbody>
          </Table>
        )}
        {selectedTable === "sales" && (
          <Table bordered className="custom-table">
            <thead className="history-table-head">
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Total amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>04/02/2024</td>
                <td>xxxxxxxxxxx</td>
                <td>34</td>
                <td>100</td>
                <td>3400</td>
              </tr>
              <tr>
                <td>04/02/2024</td>
                <td>xxxxxxxxxxx</td>
                <td>34</td>
                <td>100</td>
                <td>3400</td>
              </tr>
              <tr>
                <td>04/02/2024</td>
                <td>xxxxxxxxxxx</td>
                <td>34</td>
                <td>100</td>
                <td>3400</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  </div>
  );
};

export default ProductHistory;
