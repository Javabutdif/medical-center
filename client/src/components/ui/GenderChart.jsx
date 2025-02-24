import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GenderChart = ({ style, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext("2d");

    const config = {
      type: "bar",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Total",
            data: [data.male, data.female],
            backgroundColor: ["#7b0d1e", "#5E503F"], // Dark red and dark brown
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Total Patients by Gender",
            font: { size: 20, weight: "bold" },
            color: "#0A0908", // Dark color for better readability
            padding: { top: 10, bottom: 10 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const genderChart = new Chart(ctx, config);

    return () => {
      genderChart.destroy();
    };
  }, [data]);

  return (
    <div className={`${style} p-4 lg:p-6 w-full flex justify-between flex-col`}>
      <hr /> {/* Line added before */}
      <h2 className="text-end text-dark font-heading text-3xl font-bold mb-4">
       Patient Gender Breakdown
      </h2>
      <hr /> {/* Line added at the end */}
      <div className="relative w-full min-h-screen/lg 2xl:min-h-screen/2xl">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default GenderChart;
