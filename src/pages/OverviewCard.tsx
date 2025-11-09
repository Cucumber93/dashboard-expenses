import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

//Services
import { BalanceService } from "../services/balance.service";

export function OverviewCard() {
  const { user } = useAuth();
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [dataBalance, setDataBalance] = useState<number>(0);
  const [selectedStartDay, setSelectedStartDay] = useState<string>("27"); // ✅ state เก็บวันเริ่มต้น
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const overviewData = [
    {
      id: "income",
      title: "Income",
      value: totalIncome,
      icon: (
        <Icon
          icon="mingcute:currency-baht-2-line"
          width="24"
          height="24"
          className="text-[#0C9AFF]"
        />
      ),
      unit: "Baht",
    },
    {
      id: "expenses",
      title: "Expenses",
      value: totalExpenses,
      icon: (
        <Icon
          icon="mingcute:currency-baht-2-line"
          width="24"
          height="24"
          className="text-[#0C9AFF]"
        />
      ),
      unit: "Baht",
    },
    {
      id: "net-balance",
      title: "Net Balance",
      value: dataBalance,
      icon: (
        <Icon
          icon="mingcute:currency-baht-2-line"
          width="24"
          height="24"
          className="text-[#0C9AFF]"
        />
      ),
      unit: "Baht",
    },
  ];

  function FormatNumber(value: number) {
    if (value === null || value === undefined) return "-";
    return Number(value).toLocaleString("en-US");
  }

  const fetchBalance = async () => {
    let data = [];
    if (user && user.userId) {
      data = await BalanceService.getBalance(
        user?.userId || "null",
        selectedStartDay
      );
    }

    setDataBalance(data.netBalance);
    setTotalIncome(data.totalIncome);
    setTotalExpenses(data.totalExpense);
    setStartDate(data.periodStart)
    setEndDate(data.periodEnd)
  };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStartDay(value);
    localStorage.setItem("selectedStartDay", value); // เก็บไว้ใน localStorage
  };

  useEffect(()=>{
    const saveDay = localStorage.getItem("selectedStartDay");
    if(saveDay){
      setSelectedStartDay(saveDay);
    }
  },[])

  useEffect(() => {
    fetchBalance();
  }, [user,selectedStartDay]);

  return (
    <div>
      <div className="flex justify-between items-center gap-2 ml-10 mr-10 mt-5">
        <div>
          <label
            htmlFor="startDay"
            className="text-sm font-medium text-gray-700"
          >
            Date: {startDate} - {endDate}
          </label>
        </div>
        <div>
          <label
            htmlFor="startDay"
            className="text-sm font-medium text-gray-700"
          >
            Date Start
          </label>
          <select
            value={selectedStartDay}
            id="startDay"
            name="startDay"
            className="description-text-costom-style text-[#0C9AFF] border border-[#0C9AFF] rounded-[10px] p-1"
            onChange={handleChange} 
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 ml-10 mr-10 mt-5">
        {overviewData.map((items, id) => (
          <div key={id} className="bg-[#F2FAFF] rounded-[10px] p-2 pl-5 pr-5">
            <div className="flex justify-between">
              <div className="description-text--costom-style text-[#A7A7A7]">
                {items.title}
              </div>
              <div>{items.icon}</div>
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-[32px] font-medium">
                {FormatNumber(items.value)}
              </div>
              <div className="pb-2 text-[#A7A7A7] description-text--costom-style">
                {items.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
