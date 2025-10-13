import React, { useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { ITrendExpenses } from "../../interface/trend-expenses";

interface IPieChart {
  data: ITrendExpenses[];
}

const PieChart: React.FC<IPieChart> = ({ data }) => {

  // ✅ รวมยอด totalExpense ต่อ category
  const { labels, series } = useMemo(() => {
    const totalByCategory: Record<string, number> = {};

    data.forEach((item) => {
      const category = item.category ?? "Unknown";
      if (!totalByCategory[category]) totalByCategory[category] = 0;
      totalByCategory[category] += Number(item.totalExpense);
    });

    const labels = Object.keys(totalByCategory);
    const series = Object.values(totalByCategory);

    return { labels, series };
  }, [data]);

  useEffect(() => {
    console.log("📊 Pie Data:", { labels, series });
  }, [labels, series]);

  // ✅ Chart options
  const options: ApexOptions = {
    chart: {
      type: "pie",
      width: "100%",
    },
    labels,
    colors: ["#8C7CF0", "#FF9CA3", "#49CFE0", "#FFD966", "#A2D8FF"],
    legend: {
      position: "right",
      fontSize: "14px",
      labels: { colors: "#6B7280" },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(2)}%`,
      style: {
        fontSize: "13px",
        colors: ["#fff"],  
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} บาท`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="190%"
        height="190%"
      />
    </div>
  );
};

export default PieChart;
