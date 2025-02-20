import React from 'react'
import Table from "react-bootstrap/Table";

const CustomerSales = () => {
  return (
    <div className="table-container mx-5 mt-5">
      <Table bordered className="custom-table sales-in-outbound-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Sales id</th>
            <th>Product name</th>
            <th>SKU</th>
            <th>Invoice Id</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td className="purchase-id">#50408543345</td>
            <td>xxxxxxxxxx</td>
            <td>SKU-3453</td>
            <td className="purchase-id">#IN-7758082</td>
            <td>100</td>
            <td>60,575</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CustomerSales