import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const dataset = [
  { month: "Jan", sales: 3000 },
  { month: "Feb", sales: 4500 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 7000 },
  { month: "May", sales: 4000 },
  { month: "Jun", sales: 8000 },
  { month: "Jul", sales: 2000 },
  { month: "Aug", sales: 1500 },
  { month: "Sep", sales: 8500 },
  { month: "Oct", sales: 4500 },
  { month: "Nov", sales: 6000 },
  { month: "Dec", sales: 5000 },
];

const valueFormatter = (value) => `${value} USD`;

const chartSetting = {
  yAxis: [
    {
      label: "Sales Amount ($)",
    },
  ],
  series: [{ dataKey: "sales", label: "Sales Data", valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} `]: {
      transform: "translateX(-10px)",
    },
  },
  barWidth: 15,
};

const SalesGraphView = () => {
  const [filter, setFilter] = React.useState("");
  const [salesRevenueFilter, setSalesRevenueFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const handleSalesRevenueChange = (event) => {
    setSalesRevenueFilter(event.target.value);
  };
  return (
    <div>
      <div className="sales-graph-filter">
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={filter}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              height: "35px",
              fontSize: "14px",
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value="">
              <em>Sales revenue</em>
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="Total sales">
              Total sales
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="Total invoice">
              Total invoice
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="Total shipment">
              Total shipment
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={salesRevenueFilter}
            onChange={handleSalesRevenueChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              height: "35px",
              fontSize: "14px",
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value="">
              <em>Quarterly</em>
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="Financial year">
              Financial year
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="This year">
              This year
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value="This month">
              This month
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="sales-graph" style={{ width: "100%" }}>
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickPlacement: "middle",
              tickLabelPlacement: "middle",
            },
          ]}
          {...chartSetting}
        />
      </div>
      <hr className="sales-shipment"></hr>
      <div className="storage-location sales-shipment">
        <div className="storage-content">
          <div className="col-md-2">Ready for shipment</div>
          <div className="col-md-1">:</div>
          <div className="col-md-3 fw-bold">230</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2">Packed product</div>
          <div className="col-md-1">:</div>
          <div className="col-md-3 fw-bold">100</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2">Paid invoice</div>
          <div className="col-md-1">:</div>
          <div className="col-md-3 fw-bold">200</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2">Unpaid invoice</div>
          <div className="col-md-1">:</div>
          <div className="col-md-3 fw-bold">50</div>
        </div>
      </div>
    </div>
  );
};

export default SalesGraphView;
