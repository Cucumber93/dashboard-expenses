
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { ITrendExpenses } from "../../interface/trend-expenses";

interface DonutChartProps {
  data: ITrendExpenses[];
  height?: number;
}

export default function DonutChart({
  data,
  height = 300,
}: DonutChartProps) {
  const series: number[] = data.map(
    (item) => Number(item.grandTotal ?? 0)
  );

  const labels: string[] = data.map((item) => item.category);

  const total = series.reduce((sum, val) => sum + val, 0);

  // 🚫 ไม่มีข้อมูล
  if (!data.length || total === 0) {
    return (
      <div
        className="flex items-center justify-center text-gray-400"
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },

    labels,

    legend: {
      position: "bottom",
    },

    dataLabels: {
      enabled: true,
      formatter: (val: string | number | number[]) => {
        if (Array.isArray(val)) return "";
        return `${Number(val).toFixed(1)}%`;
      },
    },

    tooltip: {
      y: {
        formatter: (value: number) =>
          `${value.toLocaleString()} บาท`,
      },
    },

    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => total.toLocaleString(),
            },
          },
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
    />
  );
}
