
import LineChart from "../components/charts/line-chart";

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
      id: "Categories Retio",
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
      typeCart: "pie",
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
          <div><LineChart/></div>
        </div>
      ))}
    </div>
  );
}
