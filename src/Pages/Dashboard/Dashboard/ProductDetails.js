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

    const labels = productDetails.map((item) => item.category); // Extract categories
    const data = productDetails.map((item) => item.count); // Extract counts

    console.log("Labels: ", labels);
    console.log("Data: ", data);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: "doughnut",
      data: {
        // labels, 
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
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                // Safely map index to get the data value and category dynamically
                const index = tooltipItem.dataIndex;
                const category = productDetails[index]?.category || "Unknown";
                const value = productDetails[index]?.count || 0;

                console.log("Hover index: ", index);
                console.log("Hover category: ", category);
                console.log("Hover value: ", value);

                return `${category}: ${value}`;
              },
            },
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
    <div className="col-md-4 product-details">
      <h4>Product details</h4>
      <div className="product-details-sub">
        <canvas ref={chartRef} style={{ maxWidth: "200px", margin: "0 auto" }} />
        {/* Separator line */}
        <div className="separator-line"></div>
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