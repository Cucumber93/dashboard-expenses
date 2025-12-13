import { useEffect, useState } from "react";

// Charts
import SelectFilter from "../components/filter/select";
import DonutChart from "../components/charts/donut-chart";
import Table from "../components/table/table";

//Interface
import type { Expense } from "../interface/table-data";

//Service
import { TrendExpensesService } from "../services/trendExpenses.service";
// import { ExpensesService } from "../services/expenses.service";
import { CompareService } from "../services/trendIncomeAndExpenses.service";

//Interface
import type { ICompare, ITrendExpenses } from "../interface/trend-expenses";
import BarChart from "../components/charts/bar-chart";
import { HistoryService } from "../services/historyExpense.service";
import { useAuth } from "../context/authContext";
import OptionMonth from "../components/filter/option-month";

export default function ChartCard() {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [dataTrendExpensesByMonth, setDataTrendExpensesByMonth] = useState<
    ITrendExpenses[]
  >([]);
  const [dataExpensesHistory, setDataExpensesHistory] = useState<Expense[]>([]);
  const [dataCompare, setDataCompare] = useState<ICompare[]>([]);
    useState<string>("monthly");
  const [filterCompare, setFilterCompare] = useState<string>("monthly");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const fetchTrendExpansesByMonth = async (
    userId: string,
    month: number,
    year: number
  ) => {
    const data = await TrendExpensesService.getTrendExpensesByMonth(
      userId,
      month,
      year
    );
    setDataTrendExpensesByMonth(data);
  };
  const fetchExpensesHistory = async (userId: string) => {
    const data = await HistoryService.getHistory(userId);
    setDataExpensesHistory(data.data);
  };

  const fetchCompare = async (type: string, userId: string) => {
    const data = await CompareService.getCompareTrend(type, userId);
    setDataCompare(data);
  };

  const handleSelectedMonth = (month: number) => {
    setSelectedMonth(month);
  };
  const handleFilterCompare = (type: string) => {
    setFilterCompare(type);
  };
  const handleSelectedYear = (year: string) => {
    setSelectedYear(year);
  }

  useEffect(()=>{
    fetchTrendExpansesByMonth(user.userId,selectedMonth,selectedYear as unknown as number);
  },[selectedMonth,selectedYear,user]);

  useEffect(() => {
    fetchExpensesHistory(user.userId);
  }, [user]);

  useEffect(() => {
    // fetchTrendExpanses(filterTrendExpense,user.userId);
    // fetchRatioExpense(filterRatioExpense, user.userId);
    fetchCompare(filterCompare, user.userId);
  }, [filterCompare, user]);

  interface Column<T> {
    key: keyof T;
    label: string;
  }

  const columns: Column<Expense>[] = [
    { key: "created_at", label: "Date" },
    { key: "categoryName", label: "Category" },
    { key: "name", label: "Name" },
    { key: "amount", label: "Amount" },
  ];

  const optionsPeriodCompare = [
    { value: "hourly", label: "Hourly" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];
  const currentYear = new Date().getFullYear();

const optionsYear = Array.from({ length: 11 }, (_, index) => {
  const year = currentYear - 5 + index;
  return {
    value: String(year),
    label: String(year),
  };
});
  return (
    <div className="ml-10 mr-10 mt-5 ">
      <div className=" rounded-[10px] grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Expenses Ratio</div>
            <SelectFilter
              options={optionsYear}
              onFilter={handleSelectedYear}
              typeDefault={selectedYear}
            />
          </div>
          <div>
            <OptionMonth
              onSelectMonth={handleSelectedMonth}
              selectedMonth={selectedMonth}
            />
          </div>
          <div className="mt-3">
            <DonutChart data={dataTrendExpensesByMonth} />
          </div>
        </div>
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Trend Conpare</div>
            <SelectFilter
              options={optionsPeriodCompare}
              onFilter={handleFilterCompare}
              typeDefault={filterCompare}
            />
          </div>
          <div className="mt-3">
            <BarChart data={dataCompare} />
          </div>
        </div>
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Expenses History</div>
          </div>
          <div className="mt-3">
            <Table columns={columns} data={dataExpensesHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
