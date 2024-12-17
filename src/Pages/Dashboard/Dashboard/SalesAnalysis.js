import React, { useEffect, useRef } from "react";
import { salesAnalysis } from "../../../Data/DashboardData";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const SalesAnalysis = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Chart colors
  const chartColors = ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD"];

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");

    // Extract labels and numerical data for the chart
    const labels = salesAnalysis.map((item) => item.item);
    const data = salesAnalysis.map((item) => parseFloat(item.data)); // Convert "34%" to 34

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: "doughnut",
      data: {
        //   labels,
        datasets: [
          {
            data,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                // Safely map index to get the data value and category dynamically
                const index = tooltipItem.dataIndex;
                const category = salesAnalysis[index]?.item || "Unknown";
                const value = salesAnalysis[index]?.data || "0%";

                return `${category}: ${value}`;
              },
            },
          },
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-md-5 product-details sales-analysis sales-category">
      <h4>Sales Analysis by Categories</h4>
      <div className="dropdown-container category-dropdown">
        <select className="custom-dropdown">
          <option value="all-time">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="this-week">This Week</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <div className="product-details-sub">
        <canvas
          ref={chartRef}
          style={{ maxWidth: "200px", margin: "0 auto" }}
        />
        {/* Separator line */}
        <div className="separator-line"></div>
        <div className="product-details-container">
          {salesAnalysis.map((sales, index) => (
            <div className="product-details-item" key={index}>
              <p className="category">
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: chartColors[index],
                    marginRight: "8px",
                    borderRadius: "2px",
                  }}
                ></span>
                {sales.item}
              </p>
              <p className="count">{sales.data}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalysis;
