"use client";

import { useState, useEffect } from "react";
import { Chart, CategoryScale, BarController, BarElement, LineController, LineElement, PointElement, Title } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title
);

export default function ProgressChart({ progressData }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (progressData.length > 0) {
      const labels = progressData.map((goal) => goal.name);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Progress",
            data: progressData.map((goal) => goal.progress),
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(54, 162, 235, 1)",
            fill: true,
          },
        ],
      };
      setChartData(data);
    }
  }, [progressData]);

  if (!chartData) {
    return <p className="text-gray-600 font-medium">No data available yet.</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Line data={chartData} options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Progress towards Goals",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      }} />
    </div>
  );
}