import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { ICompare } from "../../interface/trend-expenses";

interface IBarChartProps {
  data: ICompare[];
  title?: string;
}

const BarChart: React.FC<IBarChartProps> = ({ data}) => {
  // ✅ เตรียม labels และ series จากข้อมูลจริง
  const { labels, series } = useMemo(() => {
    const labels = data.map((item) => item.period);
    const series = [
      {
        name: "Income",
        data: data.map((item) => item.totalIncome),
      },
      {
        name: "Expense",
        data: data.map((item) => item.totalExpense),
      },
    ];
    return { labels, series };
  }, [data]);

  // ✅ ตั้งค่า options
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: '100%',
      width:'100%',
      toolbar: { show: true },
    },
    title: {
      align: "left",
      style: { fontSize: "16px", fontWeight: "600" },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels, // ✅ ใช้ period เป็น label
      title: { text: "Period (Month)" },
    },
    yaxis: {
      title: { text: "Amount (฿)" },
      labels: {
        formatter: (val) => val.toLocaleString(),
      },
    },
    fill: { opacity: 1 },
    colors: ["#49CFE0", "#FF9CA3"], // income = blue, expense = red/pink
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} บาท`,
      },
    },
  };

  return (
    <div className="w-full flex justify-center">
      <ReactApexChart options={options} series={series} type="bar" height="180%" width="220%" />
    </div>
  );
};

export default BarChart;
