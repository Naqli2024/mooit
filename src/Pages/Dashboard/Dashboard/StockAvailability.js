import React, { useEffect, useRef } from "react";
import {
  Chart,
  BubbleController,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { StockAvailable } from "../../../Data/DashboardData";

Chart.register(
  BubbleController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const StockAvailability = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");
  
    const parsedData = StockAvailable.map((item, index) => ({
      x: index * 0.8 + 1, 
      y: parseFloat(item.data) * 0.8,
      r: Math.max(parseFloat(item.data) / 0.65, 9), 
    }));
  
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
  
    chartInstanceRef.current = new Chart(chartCtx, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Stock Availability",
            data: parsedData,
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const index = tooltipItem.dataIndex;
                const stock = StockAvailable[index]?.stock || "Unknown";
                const value = StockAvailable[index]?.data || "0%";
                return `${stock}: ${value}`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false, 
          },
          y: {
            display: false, 
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
    <div className="col-md-6 product-details sales-analysis">
      <h4>Stock Availability</h4>
      <div style={{ display: "flex", alignItems: "center", height: "300px" }}>
        <div style={{ flex: "1", position: "relative", height: "100%" }}>
          <canvas ref={chartRef}></canvas>
        </div>
        <div style={{ flex: "0 0 200px", paddingLeft: "20px" }}>
          <p style={{ color: "#36A2EB", fontSize: "14px" }}>
            ● In Stock: {StockAvailable[0]?.data || "0"}%
          </p>
          <p style={{ color: "#FF6384", fontSize: "14px" }}>
            ● Out of Stock: {StockAvailable[1]?.data || "0"}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockAvailability;
