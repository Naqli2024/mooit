import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
const ProductSalesInformation = () => {
  return (
    <div>
    <div className="storage-location">
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Selling amount</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">7685</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Description</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">sfaffdsfaggggagdg</div>
        </div>
      </div>
      <div className="col-md-4 sales-info product-sales-order">
      <h4>Total sales order</h4>
      <div className="dropdown-container sales-dropdown">
        <select className="custom-dropdown">
          <option value="all-time">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="this-week">This Week</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <div className="sales-chart-container">
      <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={700}
      height={300}
    />
      </div>
    </div>
    </div>
  )
}

export default ProductSalesInformation