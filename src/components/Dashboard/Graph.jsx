// src/components/Graph.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ data }) => {
  const chartData = {
    labels: data.length === 0 ? ["", "", "", "", "", "", "", "", ""] : data.map((item) => item.date),
    datasets: [
      {
        label: "Total Clicks",
        data: data.length === 0 ? [1, 2, 3, 4, 5, 4, 3, 2, 1] : data.map((item) => item.clickCount),
        backgroundColor: data.length === 0 ? '#f2f7f7' : "rgba(37, 99, 235, 0.7)", 
        borderRadius: 5,
        barThickness : 20
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Number of Clicks" } },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graph;
