import React, { useEffect, useRef } from "react";
import { productDetails } from "../../../Data/DashboardData";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ProductDetails = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");

    // Dynamically generate labels and data from productDetails
    const labels = productDetails.map((item) => item.category);
    const data = productDetails.map((item) => item.count);

    // Destroy any existing chart instance to avoid canvas reuse error
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new Doughnut Chart instance
    chartInstanceRef.current = new Chart(chartCtx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-md-4 product-details">
      <h4>Product details</h4>
      <div className="product-details-sub">
        <canvas
          ref={chartRef}
          style={{ maxWidth: "150px", margin: "0 auto" }}
        />
        <div className="product-details-container">
          {productDetails.map((productDetail, index) => (
            <div className="product-details-item" key={index}>
              <p className="category">{productDetail.category}</p>
              <p className="count">{productDetail.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
