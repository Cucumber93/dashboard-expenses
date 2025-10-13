import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { ITrendExpenses } from "../../interface/trend-expenses";

interface DataPoint {
  x: number;
  y: number;
}

interface ILineChart {
  data: ITrendExpenses[];
}

const ApexChart: React.FC<ILineChart> = ({ data }) => {
  const [series, setSeries] = useState<{ name: string; data: DataPoint[] }[]>([]);

  const [options] = useState<ApexOptions>({
    chart: {
      id: "realtime",
      type: "line",
      height: "100%",   // ✅ ให้เต็ม container
      width: "100%",    // ✅ ให้เต็ม container
      animations: {
        enabled: true,
        speed: 800,
        dynamicAnimation: { speed: 1000 },
      },
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    // title: { text: "Expenses Trend by Category", align: "left" },
    markers: { size: 4 },
    xaxis: { type: "datetime", title: { text: "Date / Time" } },
    yaxis: { title: { text: "Expense (บาท)" } },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontSize: "14px",
    },
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const grouped: Record<string, DataPoint[]> = {};
    data.forEach((item) => {
      const category = item.category ?? "Unknown";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push({
        x: new Date(item.datetime).getTime(),
        y: Number(item.totalExpense),
      });
    });

    const formattedSeries = Object.keys(grouped).map((category) => ({
      name: category,
      data: grouped[category].sort((a, b) => a.x - b.x),
    }));

    setSeries(formattedSeries);
  }, [data]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full">
        <ReactApexChart options={options} series={series} type="line" height="180%" width="100%" />
      </div>
    </div>
  );
};

export default ApexChart;
