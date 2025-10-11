import LineChart from "../components/charts/line-chart";
import type { Expense } from "../interface/table-data";
import PieChart from "./charts/pie-chart";
import StackedBarChart from "./charts/stacked-chart";
import Table from "./table/table";

export default function ChartCard() {
  const chartData = [
    {
      id: "trend-expenses",
      title: "Trend Expenses",
      subExpenses: [
        {
          date: "2023-10-01 06.00",
          category: "Food",
          amount: 150,
        },
        {
          date: "2023-10-01 08.00",
          category: "Transport",
          amount: 50,
        },
        {
          date: "2023-10-01 12.00",
          category: "Shopping",
          amount: 200,
        },
      ],
      typeCart: "line",
    },
    {
      id: "categories-retio",
      title: "Categories Retio",
      subExpenses: [
        {
          date: "2023-10-01 06.00",
          category: "Food",
          amount: 150,
        },
        {
          date: "2023-10-01 08.00",
          category: "Transport",
          amount: 50,
        },
        {
          date: "2023-10-01 12.00",
          category: "Shopping",
          amount: 200,
        },
      ],
      typeCart: "pie",
    },
    {
      id: "trend-income-expenses",
      title: "Trend Income and Expenses",
      subExpenses: [
        {
          date: "2023-10-01 06.00",
          category: "Food",
          amount: 150,
        },
        {
          date: "2023-10-01 08.00",
          category: "Transport",
          amount: 50,
        },
        {
          date: "2023-10-01 12.00",
          category: "Shopping",
          amount: 200,
        },
      ],
      typeCart: "bar",
    },

    {
      id: "history-expenses",
      title: "History Expenses",
      subExpenses: [
        {
          date: "2023-10-01 06.00",
          category: "Food",
          amount: 150,
        },
        {
          date: "2023-10-01 08.00",
          category: "Transport",
          amount: 50,
        },
        {
          date: "2023-10-01 12.00",
          category: "Shopping",
          amount: 200,
        },
      ],
      typeCart: "table",
    },
  ];

  interface Column<T> {
    key: keyof T;
    label: string;
  }

  const columns: Column<Expense>[] = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "description", label: "Name" },
    { key: "value", label: "Value" },
    { key: "type", label: "Type" },
  ];

  const data: Expense[] = [
    {
      date: "2025-10-11",
      category: "Food",
      description: "Steak",
      value: 120,
      type: "Expense",
    },
    {
      date: "2025-10-12",
      category: "Transport",
      description: "Taxi",
      value: 80,
      type: "Expense",
    },
    {
      date: "2025-10-13",
      category: "Entertainment",
      description: "Movie",
      value: 250,
      type: "Expense",
    },
  ];

  return (
    <div className="ml-10 mr-10 mt-5  rounded-[10px] grid grid-cols-2 gap-5">
      {chartData.map((items, id) => (
        <div key={id} className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">{items.title}</div>
            <div>
              <select className="description-text-costom-style text-[#0C9AFF] border border-[#0C9AFF] rounded-[10px] p-1">
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last90days">Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="mt-5 ">
            {items.typeCart === "line" ? (
              <LineChart />
            ) : items.typeCart === "pie" ? (
              <div>
                <PieChart />
              </div>
            ) : items.typeCart === "bar" ? (
              <div>
                <StackedBarChart />
              </div>
            ) : items.typeCart === "table" ? (
              <div>
                <Table columns={columns} data={data} />
              </div>
            ) : (
              <div>Not Found Chart</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
