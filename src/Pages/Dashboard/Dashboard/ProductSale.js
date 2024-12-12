import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { productSaleData } from "../../../Data/DashboardData";

// Register necessary Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ProductSale = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = productSaleData.map((item) => item.month);
    const grossMargins = productSaleData.map((item) => item.data.GrossMargin);
    const revenues = productSaleData.map((item) => item.data.Revenue);

    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Gross Margin",
            data: grossMargins,
            backgroundColor: "#2196F3",
            barThickness: 20,
            borderRadius: 5,
          },
          {
            label: "Revenue",
            data: revenues,
            backgroundColor: "#EB6424",
            barThickness: 20,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Product Sale Analysis (Gross Margin vs Revenue)",
          },
        },
        scales: {
          x: {
            title: {
              display: false,
            },
            categoryPercentage: 0.7,
            barPercentage: 0.6,
          },
          y: {
            title: {
              display: false,
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-md-12 product-details product-sale">
      <h4>Stock Availability</h4>
      <div className="dropdown-container">
        <select className="custom-dropdown">
          <option value="all-time">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="this-week">This Week</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <canvas ref={chartRef} style={{ maxHeight: "350px" }}></canvas>
    </div>
  );
};

export default ProductSale;
