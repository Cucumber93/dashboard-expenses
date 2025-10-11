import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

// ----- Chart Config -----
const XAXISRANGE = 10 * 1000; // 10 seconds range

interface DataPoint {
  x: number;
  y: number;
}

let lastDate = new Date().getTime();
const data: DataPoint[] = [];

// Generate a new random data point
function getNewSeries(baseval: number, yrange: { min: number; max: number }) {
  const newDate = baseval + 1000;
  lastDate = newDate;

  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  });

  // Keep latest 10 points
  if (data.length > 10) data.shift();
}

const ApexChart: React.FC = () => {
  const [series, setSeries] = useState([{ data: [] as DataPoint[] }]);

  const [options] = useState<ApexOptions>({
    chart: {
      id: "realtime",
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        dynamicAnimation: { speed: 1000 },
      },

      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: { text: "Dynamic Updating Chart", align: "left" },
    markers: { size: 0 },
    xaxis: { type: "datetime", range: XAXISRANGE },
    yaxis: { max: 100 },
    legend: { show: false },
  });

  // Real-time update every second
  useEffect(() => {
    const interval = setInterval(() => {
      getNewSeries(lastDate, { min: 10, max: 90 });
      setSeries([{ data: [...data] }]); // update chart state
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
