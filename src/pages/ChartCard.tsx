import { useEffect, useState } from "react";
import LineChart from "../components/charts/line-chart";
// import type { Expense } from "../interface/table-data";
import PieChart from "../components/charts/pie-chart";
import SelectFilter from "../components/filter/select";
// import Table from "../components/table/table";

//Service
import { TrendExpensesService } from "../services/trendExpenses.service";
// import { ExpensesService } from "../services/expenses.service";
import { HistoryService } from "../services/historyExpense.service";


import {CompareService} from '../services/trendIncomeAndExpenses.service'

//Interface
import type { ICompare, ITrendExpenses } from "../interface/trend-expenses";
import BarChart from "../components/charts/bar-chart";
import { useAuth } from "../context/authContext";

export default function ChartCard() {
    const {user} = useAuth()
  const [dataTrendExpenses, setDataTrendExpenses] = useState<ITrendExpenses[]>([]);
  // const [dataExpensesHistory, setDataExpensesHistory] = useState<Expense[]>([]);
  const [dataCompare,setDataCompare] = useState<ICompare[]>([])
  const [filter, setFilter] = useState<string>("hourly");

  const fetchCompare = async( type:string)=>{
    const data = await CompareService.getCompareTrend(type)
    setDataCompare(data)
  }
  const fetchTrendExpanses = async (type: string) => {
    const data = await TrendExpensesService.getTrendExpenses(type);
    setDataTrendExpenses(data);
  };

  // const fetchExpansesHistory = async () => {
  //   const data = await ExpensesService.getALLExpenses();
  //   setDataExpensesHistory(data);
  // };

  const handleFilter = (type: string) => {
    setFilter(type);
  };

    const fetchExpansesHistory = async () => {
      let data = []
      if(user && user.userId){
         data = await HistoryService.getHistory(user?.userId || 'null');
      }
      console.log('data history: ',data)
      // setDataExpensesHistory(data)
    };
  
    useEffect(() => {
      fetchExpansesHistory();
    }, [user]);

  useEffect(() => {
    fetchExpansesHistory();
  }, []);

  useEffect(()=>{
    fetchTrendExpanses(filter)
    fetchCompare(filter)
  },[filter])

  // interface Column<T> {
  //   key: keyof T;
  //   label: string;
  // }

  // const columns: Column<Expense>[] = [
  //   { key: "created_at", label: "Date" },
  //   { key: "categoryId", label: "Category" },
  //   { key: "name", label: "Name" },
  //   { key: "value", label: "Value" },
  // ];


  return (
    <div className="ml-10 mr-10 mt-5 ">
      <div className="flex justify-end mb-5">
        <SelectFilter onFilter={handleFilter}/>
      </div>
       <div className=" rounded-[10px] grid grid-cols-2 gap-5">
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Trend Expenses</div>
          </div>
          <div className="mt-3">
            <LineChart data={dataTrendExpenses}/>
          </div>
        </div>
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Expenses Ratio</div>
          </div>
          <div className="mt-3"> 
            <PieChart data={dataTrendExpenses}/>
          </div>
        </div>
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Trend Conpare</div>
          </div>
          <div className="mt-3">
            <BarChart data={dataCompare}/>
          </div>
        </div>
        <div className="bg-[#F2FAFF] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="head-text-costom-style">Expenses History</div>
          </div>
          <div className="mt-3">
            {/* <Table columns={columns} data={dataExpensesHistory} /> */}
          </div>
        </div>
    </div>
    </div>
   
  );
}
