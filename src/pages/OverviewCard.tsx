import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

//Services
import { BalanceService } from "../services/balance.service";

export function OverviewCard() {
  const {user} = useAuth()
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [dataBalance, setDataBalance] = useState<number>(0);

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
    console.log(user?.userId)
    const data = await BalanceService.getBalance(user?.userId);

    console.log('data balence: ',data)
    setDataBalance(data.netBalance);
    setTotalIncome(data.totalIncome);
    setTotalExpenses(data.totalExpense);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(()=>{
    console.log('overview: ',user)
  },[user])
  return (
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
  );
}
