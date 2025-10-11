import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
  const series = [44, 55, 13, 43, 22];

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "pie", // ✅ TypeScript knows this is valid
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    colors: ["#8C7CF0", "#FF9CA3", "#49CFE0", "#FFD966", "#A2D8FF"],
    legend: {
      position: "right",
      fontSize: "14px",
      labels: { colors: "#6B7280" },
    },
    dataLabels: {
      enabled: true,
      formatter: (val:number) => `${val.toFixed(2)}%`,
      style: {
        fontSize: "13px",
        colors: ["#555"],
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center">
      <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default PieChart;
